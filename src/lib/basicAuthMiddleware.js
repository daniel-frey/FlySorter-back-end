'use strict';

const HttpError = 'http-errors';
const Account = '../model/account';

module.exports = (request, response, next) => {
  if (!request.headers.authorization) {
    return next(new HttpError(400, 'AUTH | invalid request'));
  }

  const base64AuthHeader = request.headers.authorization.split('Basic ')[1];
  if (!base64AuthHeader) {
    return next(new HttpError(400, 'AUTH | invalid request'));
  }

  const stringAuthHeader = Buffer.from(base64AuthHeader, 'base64').toString();


  const [username, password] = stringAuthHeader.split(':');

  if (!username || !password) {
    return next(new HttpError(400, 'AUTH | invalid request'));
  }

  return Account.findOne({ username })
    .then((account) => {
      if (!account) {
        return next(new HttpError(400, 'AUTH | invalid request'));
      }
      return account.pVerifyPassword(password);
    })
    .then((account) => {
      request.account = account;
      return next();
    })
    .catch(next);
};
