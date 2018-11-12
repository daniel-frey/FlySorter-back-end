'use strict';

const logger = require('./logger');

module.exports = (error, request, response, next) => { //eslint-disable-line
  logger.log(logger.ERROR, '__ERROR_MIDDLEWARE__');
  logger.log(logger.ERROR, error);

  if (error.status) {
    logger.log(logger.INFO, `Responding with a ${error.status} code and message ${error.message}`);
    return response.sendStatus(error.status);
  }

  const errorMessage = error.message.toLowerCase();

  if (errorMessage.includes('objectid failed')) {
    logger.log(logger.INFO, 'ERROR MIDDLEWARE | Responding with a 404 status code');
    return response.sendStatus(404);
  }
  if (errorMessage.includes('validation failed')) {
    logger.log(logger.INFO, 'ERROR MIDDLEWARE | Responding with a 400 status code');
    return response.sendStatus(400);
  }
  if (errorMessage.includes('duplicate key')) {
    logger.log(logger.INFO, 'ERROR MIDDLEWARE | Responding with a 409 status code');
    return response.sendStatus(409);
  }
  if (errorMessage.includes('unauthorized')) {
    logger.log(logger.INFO, 'ERROR MIDDLEWARE | Responding with a 401 status code');
    return response.sendStatus(401);
  }

  logger.log(logger.ERROR, 'ERROR MIDDLEWARE | Responding with a 500 error status code');
  logger.log(logger.ERROR, error);
  return response.sendStatus(500);
};
