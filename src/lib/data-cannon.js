'use strict';

const faker = require('faker');

const loadFakeData = module.exports = {};

loadFakeData.create = (partsContext, events, done) => {
  partsContext.vars.partId = faker.lorem.words(1) + Math.random().toString();
  partsContext.vars.partDescription = faker.lorem.words(5);
  partsContext.vars.partSub = faker.random.boolean();
  partsContext.vars.partSrc = faker.lorem.words(2);
  partsContext.vars.partMfgNum = Math.random().toString();
  partsContext.vars.partPrice = Math.random().toString();
  partsContext.vars.partCategory = faker.lorem.words(3);
  partsContext.vars.partLocation = faker.lorem.words(3);
  partsContext.vars.partCount = Math.random().toString();
  partsContext.vars.partLongLead = faker.lorem.words(3);
  partsContext.vars.partNotes = faker.lorem.words(3);
  partsContext.vars.subAssembly = '5beb5a73c8a0232118d33821';
  return done();
};