'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const Part = require('../model/part');

const jsonParser = bodyParser.json();
const router = module.exports = new express.Router();
const logger = require('../lib/logger');

// ==========================================================================
// CREATE Part
// ==========================================================================
router.post('/parts', jsonParser, (request, response, next) => {
  if (!request.body) {
    logger.log(logger.INFO, '400 | invalid request');
    return response.sendStatus(400);
  }
  return Part.create(
    request.body.partId,
    request.body.partDescription,
    request.body.partSub,
    request.body.partSrc,
    request.body.partMfgNum,
    request.body.partPrice,
    request.body.partCategory,
    request.body.partLocation,
    request.body.partCount,
    request.body.partLongLead,
    request.body.partNotes,
    request.body.subAssembly,
  )
    .then((part) => {
      logger.log(logger.INFO, 'SUCCESS - Creating sub-assembly', part);
    })
    .catch(next);
});
