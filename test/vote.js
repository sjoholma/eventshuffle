const {
  post,
  createEvent,
} = require('./methods');

describe('Try some invalid votes', () => {
  const endpoint = '/api/v1/event';

  it('should return 404 for bogus id', () => {
    const vote = {
      name: 'Jack',
      votes: [
        '2014-01-01',
        '2014-01-05',
      ],
    };

    return post(endpoint.concat('/bogus/vote'), vote).expect(404);
  });

  it('should return 400 for unnamed vote', () => {
    const vote = {
      name: '',
      votes: [
        '2014-01-01',
        '2014-01-05',
      ],
    };

    const eventPayload = {
      name: 'Jake\'s secret party',
      dates: [
        '2014-01-01',
        '2014-01-05',
        '2014-01-12',
      ],
    };

    return createEvent(endpoint, eventPayload)
      .then(id => post(`${endpoint}/${id}/vote`, vote).expect(400));
  });

  it('should return 400 for invalid dates', () => {
    const vote = {
      name: 'Jack',
      votes: [
        'Friday',
      ],
    };

    const eventPayload = {
      name: 'Jake\'s secret party',
      dates: [
        '2014-01-01',
        '2014-01-05',
        '2014-01-12',
      ],
    };

    return createEvent(endpoint, eventPayload)
      .then(id => post(`${endpoint}/${id}/vote`, vote).expect(400));
  });
});
