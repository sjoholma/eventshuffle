const { expect, create, list } = require('./wrappers');

describe('list', () => {
  let id = 0;

  before((done) => {
    const payload = {
      name: 'Jake\'s secret party',
      dates: [
        '2014-01-01',
        '2014-01-05',
        '2014-01-12',
      ],
    };

    const body = { body: JSON.stringify(payload) };

    create.run({ body }).then((r) => {
      if (r.statusCode !== 200) {
        done(new Error(r.statusCode));
      } else {
        id = r.body.id;
        done();
      }
    });
  });

  it('list events', () =>
    list.run({}).then((r) => {
      expect(r).to.have.property('statusCode', 200);
      expect(r.body).to.have.property('events');
      const event = r.body.events.find(e => e.id === id);
      expect(event).to.have.property('name');
      expect(event.name).to.be('Jake\'s secret party');
    }));
});
