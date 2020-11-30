const { expect } = require('chai');

const {
  post,
  createEvent,
  listEvents,
  showEvent,
} = require('./methods');

describe('Create, list and show', () => {
  const endpoint = '/api/v1/event';

  it('should return 400 for empty payload', () => {
    post(endpoint, {}).expect(400);
  });

  it('should return 400 for invalid payload', () => {
    const invalidPayload = {
      name: 'Jake\'s secret party',
      votes: [
        '2014-01-01',
        '2014-01-05',
        '2014-01-12',
      ],
    };

    return post(endpoint, invalidPayload).expect(400);
  });

  it('should create a new event, return it in a list and show the event', () => {
    const payload = {
      name: 'Jake\'s secret party',
      dates: [
        '2014-01-01',
        '2014-01-05',
        '2014-01-12',
      ],
    };

    let eventId = 0;

    return createEvent(endpoint, payload)
      .then((id) => { eventId = id; })
      .then(() => listEvents(`${endpoint}/list`))
      .then((events) => {
        expect(events).to.be.an('array');
        const vote = events.find((e) => e.id === eventId);
        expect(vote).to.have.property('name');
        expect(vote.name).to.be.equal('Jake\'s secret party');
        return eventId;
      })
      .then((id) => showEvent(`${endpoint}/${id}`, id))
      .then((body) => {
        expect(body.dates).to.have.lengthOf(payload.dates.length);
        expect(body.dates).to.include.members(payload.dates);
      });
  });
});
