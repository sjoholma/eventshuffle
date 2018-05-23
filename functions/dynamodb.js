const AWS = require('aws-sdk');

AWS.config.update({ region: 'europe-west-1' });

let options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
};

// Uncomment for live run. For now serverless-mocha-plugin doesn't set offline flag
// https://github.com/nordcloud/serverless-mocha-plugin/issues/83
/*
if (!process.env.IS_OFFLINE) {
  options = {};
}
*/

const client = new AWS.DynamoDB.DocumentClient(options);

module.exports = client;
