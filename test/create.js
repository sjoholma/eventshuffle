const { expect, create } = require('./wrappers');

describe('create', () => {
  before((done) => {
    done();
  });

  const payload = {
    name: 'Jake\'s secret party',
    dates: [
      '2014-01-01',
      '2014-01-05',
      '2014-01-12',
    ],
  };

  const body = { body: JSON.stringify(payload) };

  it('should create new event', () =>
    create.run(body).then((r) => {
      expect(r).to.have.property('statusCode', 200);
      expect(r.body).to.have.property('id');
      expect(r.body.id).to.have.lengthOf(36);
    }));
});
