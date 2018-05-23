const { expect, show } = require('./wrappers');

describe('show', () => {
  before((done) => {
    done();
  });

  it('show event', () => {
    show.run({}).then((r) => {
      expect(r).to.not.be.empty;
    });
  });
});
