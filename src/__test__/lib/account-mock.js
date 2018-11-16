'use strict';

const faker = require('faker');
const logger = require('logger');
const Account = require('../../model/account');

const accountMock = module.exports = {};

accountMock.pCreateMock = () => {
  const mock = {};
  mock.request = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    recoveryQuestion: faker.lorem.words(5),
    recoveryAnswer: faker.lorem.words(1),
    isAdmin: false,
  };

  return Account.create(
    mock.request.username,
    mock.request.password,
    mock.request.recoveryQuestion,
    mock.request.recoveryAnswer,
    mock.request.isAdmin,
  )
    .then((createdAccount) => {
      mock.account = createdAccount;
      return createdAccount.pCreateToken();
    })
    .then((token) => {
      mock.token = token;
      return mock;
    })
    .catch((error) => {
      logger.log(logger.ERROR, error);
    });
};

accountMock.pCleanAccountMocks = () => Account.remove({});
