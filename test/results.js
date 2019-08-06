const { expect } = require('chai');
const {
  get,
  createEvent,
  voteEvent,
  showResults,
} = require('./methods');

describe('Create, vote and show results', () => {
  const endpoint = '/api/v1/event';

  it('should return 404 for bogus id', () => {
    get(endpoint.concat('/bogus')).expect(404);
  });

  it('should create a new event, vote for the event three times and show the event with votes', () => {
    const eventPayload = {
      name: 'Jake\'s secret party',
      dates: [
        '2014-01-01',
        '2014-01-05',
        '2014-01-12',
        '2014-01-31',
      ],
    };

    const vote1Payload = {
      name: 'Dick',
      votes: [
        '2014-01-01',
        '2014-01-05',
        '2014-01-12',
      ],
    };

    const vote2Payload = {
      name: 'John',
      votes: [
        '2014-01-01',
        '2014-01-12',
      ],
    };

    const vote3Payload = {
      name: 'George',
      votes: [
        '2014-01-01',
        '2014-01-12',
        '2014-01-31',
      ],
    };

    let eventId = 0;

    return createEvent(endpoint, eventPayload)
      .then((id) => { eventId = id; })
      .then(() => voteEvent(`${endpoint}/${eventId}/vote`, eventId, vote1Payload))
      .then(() => voteEvent(`${endpoint}/${eventId}/vote`, eventId, vote2Payload))
      .then(() => voteEvent(`${endpoint}/${eventId}/vote`, eventId, vote3Payload))
      .then(() => showResults(`${endpoint}/${eventId}`, eventId))
      .then((dates) => {
        expect(dates).to.have.lengthOf(2);

        let date = dates.find(v => v.date === '2014-01-01');
        expect(date.people).to.be.an('array');
        expect(date.people).to.have.lengthOf(3);
        expect(date.people).to.include.members(['Dick', 'John', 'George']);

        date = dates.find(v => v.date === '2014-01-12');
        expect(date.people).to.be.an('array');
        expect(date.people).to.have.lengthOf(3);
        expect(date.people).to.include.members(['Dick', 'John', 'George']);
      });
  });
});
