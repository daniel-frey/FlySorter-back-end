
'use strict';

const faker = require('faker');
const superagent = require('superagent');
const accountMock = require('./lib/account-mock');
const server = require('../lib/server');

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Testing account signup and login', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  beforeEach(accountMock.pCleanAccountMocks);

  test('Should return a 200 status code and a token if the user signs up correctly', () => {
    return superagent.post(`${API_URL}/signup`)
      .send({
        username: faker.lorem.words(1),
        password: faker.lorem.words(1),
        recoveryQuestion: faker.lorem.words(1),
        isAdmin: faker.random.boolean(),
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });

  test('Should return a 400 code if there is no body or incorrect body', () => {
    return superagent.post(`${API_URL}/signup`)
      .send({
        incorrectBody: '',
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(401);
      });
  });

  test('Should return a 404 if the route cannot be found', () => {
    return superagent.post(`${API_URL}/thiswontwork`)
      .send({
        username: faker.lorem.words(1),
        email: faker.internet.email(),
        password: faker.lorem.words(1),
        recoveryQuestion: faker.lorem.words(1),
        isAdmin: faker.random.boolean(),
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(404);
      });
  });

  test('Should return a 200 status code and a token if the user is logged in correctly', () => {
    return accountMock.pCreateMock()
      .then((mock) => {
        return superagent.get(`${API_URL}'/login`)
          .auth(mock.request.username, mock.request.password);
      })
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.token).toBeTruthy();
      });
  });

  test('Should return a 400 status code if the request is invalid', () => {
    return accountMock.pCreateMock()
      .then((mock) => {
        return superagent.get(`${API_URL}/login`)
          .auth(mock.request.incorrectUsername, mock.request.password);
      })
      .then(Promise.reject)
      .catch((response) => {
        expect(response.status).toEqual(400);
      });
  });
});
