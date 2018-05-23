const parse = function parse(body) {
  try {
    return JSON.parse(body);
  } catch (err) {
    return undefined;
  }
};

const fail = function fail(callback, error, expl) {
  console.error(error);
  callback(null, {
    statusCode: error.statusCode || 501,
    headers: { 'Content-Type': 'text/plain' },
    body: expl,
  });
};

const ensureArray = function ensureArray(array) {
  return Array.isArray(array) && array.length > 0 && array.every(i => typeof i === 'string');
};

module.exports = {
  parse,
  fail,
  ensureArray,
};
