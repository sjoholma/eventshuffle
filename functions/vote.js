const dynamoDb = require('./dynamodb');
const lib = require('./lib');

module.exports.vote = (event, context, callback) => {
  const data = lib.parse(event.body);

  if (data === undefined ||
    typeof data.name !== 'string' ||
    data.name.length === 0 ||
    !lib.ensureArray(data.votes)) {
    lib.fail(callback, { statusCode: 400 }, 'Syntax error');
    return;
  }

  function update(votes, name, timestamp) {
    const params = {
      TableName: process.env.eventsTable,
      Key: {
        id: event.pathParameters.id,
      },
      UpdateExpression: 'set votes = :votes, modified = :modified add voteCount :increment',
      ExpressionAttributeValues: {
        ':votes': votes,
        ':timestamp': timestamp,
        ':modified': (new Date()).getTime(),
        ':increment': 1,
      },
      ConditionExpression: 'modified = :timestamp',
      ReturnValues: 'ALL_NEW',
    };

    dynamoDb.update(params, (error, results) => {
      if (error) {
        lib.fail(callback, error, 'Vote failed');
      } else {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(results.Attributes),
        });
      }
    });
  }

  const params = {
    TableName: process.env.eventsTable,
    Key: {
      id: event.pathParameters.id,
    },
    ProjectionExpression: 'dates, votes, modified',
  };

  dynamoDb.get(params, (error, results) => {
    if (error) {
      lib.fail(callback, error, 'Vote failed');
    } else if (!results.Item) {
      lib.fail(callback, { statusCode: 404 }, 'Event not found');
    } else {
      const uniqueVotes = [...new Set(data.votes)];

      const validVotes = uniqueVotes.filter(v =>
        results.Item.dates.includes(v));

      if (validVotes.length === 0) {
        lib.fail(callback, { statusCode: 400 }, 'Invalid date');
        return;
      }

      const existingVotes = results.Item.votes || [];

      const appendedVotes = existingVotes.map((x) => {
        const vote = validVotes.find(v => v === x.date);
        if (vote !== undefined) {
          x.people.push(data.name);
        }
        return x;
      });

      const validVotesNewDays = validVotes.filter(v =>
        existingVotes.find(x => x.date === v) === undefined);

      const newVotes = validVotesNewDays.map(v => ({
        date: v,
        people: [data.name],
      }));

      const combinedVotes = appendedVotes.concat(newVotes);

      update(combinedVotes, data.name, results.Item.modified);
    }
  });
};
