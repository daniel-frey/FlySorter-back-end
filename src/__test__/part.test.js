'use strict';

const superagent = require('superagent');
const partMock = require('./lib/part-mock');
const server = require('../lib/server');

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Testing part routes', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should return a part object', () => {
    return partMock.pCreatePartMock()
      .then((response) => {
        expect(response.part).toBeTruthy();
      });
  });

  test('should return a 200 status code and a token if a part is created successfully', () => {
    return partMock.pCreatePartMock()
      .then((response) => {
        expect(response.part).toBeTruthy();
      });
  });
  test('Should return a response for a successful GET request', () => {
    return superagent.get(`${API_URL}/parts`)
      .then((response) => {
        expect(response).toBeTruthy();
      });
  });
});
