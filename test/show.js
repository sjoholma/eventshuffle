const {
  get,
  createEvent,
  voteEvent,
  showEvent,
} = require('./methods');

const { expect } = require('chai');

describe('Create, vote and show event', () => {
  const endpoint = '/api/v1/event';

  it('should return 404 for bogus id', () => {
    get(endpoint.concat('/bogus')).expect(404);
  });

  it('should create a new event, vote for the event twice and show the event with votes', () => {
    const eventPayload = {
      name: 'Jake\'s secret party',
      dates: [
        '2014-01-01',
        '2014-01-05',
        '2014-01-12',
      ],
    };

    const vote1Payload = {
      name: 'Dick',
      votes: [
        '2014-01-01',
        '2014-01-05',
      ],
    };

    const vote2Payload = {
      name: 'John',
      votes: [
        '2014-01-01',
        '2014-01-12',
      ],
    };

    let eventId = 0;

    return createEvent(endpoint, eventPayload)
      .then((id) => { eventId = id; })
      .then(() => voteEvent(`${endpoint}/${eventId}/vote`, eventId, vote1Payload))
      .then(() => voteEvent(`${endpoint}/${eventId}/vote`, eventId, vote2Payload))
      .then(() => showEvent(`${endpoint}/${eventId}`, eventId))
      .then((body) => {
        const { votes } = body;
        expect(votes).to.be.an('array');
        expect(votes).to.have.lengthOf(3);

        let vote = votes.find(v => v.date === '2014-01-01');
        expect(vote.people).to.be.an('array');
        expect(vote.people).to.have.lengthOf(2);
        expect(vote.people).to.include.members(['John', 'Dick']);

        vote = votes.find(v => v.date === '2014-01-05');
        expect(vote.people).to.be.an('array');
        expect(vote.people).to.have.lengthOf(1);
        expect(vote.people).to.include.members(['Dick']);

        vote = votes.find(v => v.date === '2014-01-12');
        expect(vote.people).to.be.an('array');
        expect(vote.people).to.have.lengthOf(1);
        expect(vote.people).to.include.members(['John']);
      });
  });
});
