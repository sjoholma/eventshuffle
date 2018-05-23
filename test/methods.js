const request = require('supertest');
const { expect } = require('chai');

const baseUrl = request('http://localhost:3000');

const get = function get(url) {
  return baseUrl
    .get(url)
    .set('Accept', 'application/json');
};

const post = function post(url, payload) {
  return baseUrl
    .post(url)
    .send(payload)
    .set('Accept', 'application/json');
};

const createEvent = function createEvent(url, payload) {
  return post(url, payload)
    .expect('Content-Type', /json/)
    .expect(200)
    .then((r) => {
      const { body } = r;
      expect(body).to.have.property('id');
      const { id } = body;
      expect(id).to.have.lengthOf(36);
      return id;
    });
};

const listEvents = function listEvents(url) {
  return get(url)
    .expect('Content-Type', /json/)
    .expect(200)
    .then((r) => {
      const { body } = r;
      expect(body).to.have.property('events');
      const { events } = body;
      expect(events).to.be.an('array');
      return events;
    });
};

const showEvent = function showEvent(url, id) {
  return get(url)
    .expect('Content-Type', /json/)
    .expect(200)
    .then((r) => {
      const { body } = r;
      expect(body).to.have.property('id');
      expect(body.id).to.equal(id);
      expect(body).to.have.property('name');
      expect(body).to.have.property('dates');
      const { dates } = body;
      expect(dates).to.be.an('array');
      return body;
    });
};

const voteEvent = function voteEvent(url, id, payload) {
  return post(url, payload)
    .expect('Content-Type', /json/)
    .expect(200)
    .then((r) => {
      const { body } = r;
      expect(body).to.have.property('id');
      expect(body.id).to.equal(id);
      expect(body).to.have.property('name');
      expect(body).to.have.property('dates');
      expect(body.dates).to.be.an('array');
      const { dates } = body;

      expect(body).to.have.property('votes');
      const { votes } = body;

      expect(votes).to.be.an('array');
      expect(votes.length).to.be.at.least(payload.votes.length);
      expect(votes.length).to.be.at.most(dates.length);

      payload.votes.map((date) => {
        const vote = votes.find(v => v.date === date);
        expect(vote).to.have.property('people');
        expect(vote.people).to.be.an('array').that.includes(payload.name);
        return date;
      });
    });
};

const showResults = function showResults(url, id) {
  return get(`/api/v1/event/${id}/results`)
    .expect('Content-Type', /json/)
    .expect(200)
    .then((r) => {
      const { body } = r;
      expect(body).to.have.property('id');
      expect(body.id).to.equal(id);
      expect(body).to.have.property('name');
      expect(body).to.have.property('suitableDates');
      expect(body.suitableDates).to.be.an('array');
      return body.suitableDates;
    });
};

module.exports = {
  get,
  post,
  createEvent,
  listEvents,
  showEvent,
  voteEvent,
  showResults,
};
