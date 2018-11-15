'use strict';

const faker = require('faker');
const Account = require('../../model/account');

const accountMock = module.exports = {};

accountMock.pCreateMock = () => {
  const mock = {};
  mock.request = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    recoveryQuestion: faker.lorem.words(1),
    isAdmin: faker.random.boolean(),
  };

  return Account.create(mock.request.username, mock.request.password, mock.request.recovery)
    .then((createdAccount) => {
      mock.account = createdAccount;
      return createdAccount.pCreateToken();
    })
    .then((token) => {
      mock.token = token;
      return mock;
    })
    .catch((error) => {
      console.error(error);
    });
};

accountMock.pCleanAccountMocks = () => Account.remove({});
