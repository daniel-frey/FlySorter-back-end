'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');

const bearerAuthMiddleware = require('../lib/bearerAuthMiddleware');
const Account = require('../model/account');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const authRouter = module.exports = new express.Router();

// ==================================================================
// SIGN-UP
// ==================================================================
authRouter.post('/signup', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'wassup');
  if (!request.body.username) {
    logger.log(logger.INFO, '400 | invalid request');
    return response.sendStatus(400);
  }
  return Account.create(request.body.username, request.body.password, request.body.recovery)
    .then((account) => {
      delete request.body.password;
      logger.log(logger.INFO, 'AUTH | creating TOKEN');
      return account.pCreateToken();
    })
    .then((token) => {
      logger.log(logger.INFO, 'AUTH | returning a 200 code and a token');
      return response.json({ token });
    })
    .catch(next);
});

// ==================================================================
// LOGIN
// ==================================================================
authRouter.get('/login', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(401, 'AUTH | invalid request'));
  }
  return request.account.pCreateToken()
    .then((token) => {
      logger.log(logger.INFO, 'Responding with a 200 status code and a TOKEN');
      return response.json({ token });
    })
    .catch(next);
});

module.exports = authRouter;
