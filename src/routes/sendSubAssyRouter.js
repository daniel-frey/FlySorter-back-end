'use strict';

const express = require('express');
const bodyParser = require('body-parser');
// const HttpError = require('http-errors');

// const bearerAuthMiddleware = require('../lib/bearerAuthMiddleware');
const SubAssy = require('../model/sub-assembly');
// const logger = require('../lib/logger');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();

const dbQuery = require('../lib/query');

const runAssyQuery = (callback) => {
  const findStuff = dbQuery.find(SubAssy, 'subId subPart subVersion subQuantity subMinutes parts');
  // run async query
  const returnData = dbQuery.query(findStuff, function (data, error) { //eslint-disable-line
    if (error) {
      return error;
    }
    if (data) {
      // convert accessCodes into iterable array
      return callback(Object.values(data));
    }
  });
};

router.get('/subassy', jsonParser, (request, response, next) => { //eslint-disable-line
  // return all users in db
  let query = runAssyQuery((callback, error) => { //eslint-disable-line
    return response.json({ dbQuery: callback });
  });
  // needs additional error handling but commit this base query for now
});
