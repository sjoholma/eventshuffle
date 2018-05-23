const mochaPlugin = require('serverless-mocha-plugin');

const create = mochaPlugin.getWrapper('list', '/functions/create.js', 'list');
const list = mochaPlugin.getWrapper('list', '/functions/list.js', 'list');
const results = mochaPlugin.getWrapper('results', '/functions/results.js', 'results');
const show = mochaPlugin.getWrapper('show', '/functions/show.js', 'show');
const vote = mochaPlugin.getWrapper('vote', '/functions/vote.js', 'vote');

const { expect, assert } = mochaPlugin.chai;

module.exports = {
  expect,
  assert,
  create,
  list,
  results,
  show,
  vote,
};
