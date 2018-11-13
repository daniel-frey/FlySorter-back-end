'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const HttpError = require('http-errors');

const bearerAuthMiddleware = require('../lib/bearerAuthMiddleware');
const Account = require('../model/account');
const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

router.get('/accounts', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  if (!request.account) {
    return next(new HttpError(400, 'bad request'));
  }
  response.send('get request to the accounts page');
});
