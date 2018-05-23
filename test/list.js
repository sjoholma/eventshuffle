const {
  createEvent,
  listEvents,
} = require('./methods');

const { expect } = require('chai');

describe('Create plenty and list all of them', () => {
  const endpoint = '/api/v1/event';

  it('should create five events and return all of them in a list', () => {
    const parties = [];

    function createParty(version) {
      const payload = { name: `Jake's secret party ${version}`, dates: ['2014-01-01'] };
      return createEvent(endpoint, payload)
        .then((id) => {
          parties.push({ id, name: payload.name });
        });
    }

    return createParty(1)
      .then(createParty(2))
      .then(createParty(3))
      .then(createParty(4))
      .then(createParty(5))
      .then(() => listEvents(`${endpoint}/list`))
      .then((events) => {
        expect(events).to.be.an('array');
        expect(events).to.include.deep.members(parties);
      });
  });
});
