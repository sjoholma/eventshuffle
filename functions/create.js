const uuid = require('uuid');
const dynamoDb = require('./dynamodb');
const lib = require('./lib');

module.exports.create = (event, context, callback) => {
  const data = lib.parse(event.body);

  if (data === undefined || typeof data.name !== 'string' || !lib.ensureArray(data.dates)) {
    lib.fail(callback, { statusCode: 400 }, 'Syntax error');
    return;
  }

  const params = {
    TableName: process.env.eventsTable,
    Item: {
      id: uuid.v1(),
      name: data.name,
      dates: data.dates,
      modified: (new Date()).getTime(),
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      lib.fail(callback, error, 'Create failed');
    } else {
      callback(null, {
        statusCode: 200,
        body: {
          id: params.Item.id,
        },
      });
    }
  });
};
