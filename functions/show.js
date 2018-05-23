const dynamoDb = require('./dynamodb');
const lib = require('./lib');

module.exports.show = (event, context, callback) => {
  const params = {
    TableName: process.env.eventsTable,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.get(params, (error, results) => {
    if (error) {
      callback(null, lib.failed(error, 'Show event failed'));
    } else {
      callback(null, {
        statusCode: results.Item ? 200 : 404,
        body: JSON.stringify({ ...results.Item, modified: undefined }) || '404 Not found',
      });
    }
  });
};
