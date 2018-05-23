const { expect, results } = require('./wrappers');

describe('results', () => {
  before((done) => {
    done();
  });

  it('show results', () => {
    results.run({}).then((r) => {
      expect(r).to.not.be.empty;
    });
  });
});
