const dynamoDb = require('./dynamodb');
const lib = require('./lib');

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: process.env.eventsTable,
    ProjectionExpression: 'id, #name',
    ExpressionAttributeNames: { '#name': 'name' },
  };

  dynamoDb.scan(params, (error, results) => {
    if (error) {
      lib.fail(callback, error, 'List events failed');
    } else {
      const events = {
        events: results.Items,
      };

      callback(null, {
        statusCode: 200,
        body: JSON.stringify(events),
      });
    }
  });
};
