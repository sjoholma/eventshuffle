const { expect, vote } = require('./wrappers');

describe('vote', () => {
  before((done) => {
    done();
  });

  it('vote for event', () => {
    vote.run({}).then((r) => {
      expect(r).to.not.be.empty;
    });
  });
});
