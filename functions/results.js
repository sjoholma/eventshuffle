const dynamoDb = require('./dynamodb');
const lib = require('./lib');

module.exports.results = (event, context, callback) => {
  const params = {
    TableName: process.env.eventsTable,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.get(params, (error, results) => {
    if (error) {
      callback(null, lib.failed(error, 'Show results failed'));
    } else {
      const dates = results.Item.votes.filter(v => v.people.length === results.Item.voteCount);

      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          id: results.Item.id,
          name: results.Item.name,
          suitableDates: dates,
        }),
      });
    }
  });
};
