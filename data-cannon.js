'use strict';

const faker = require('faker');

const loadFakeData = module.exports = {};

loadFakeData.create = (partsContext, events, done) => {
  // SUBASSEMBLY
  partsContext.vars.subId = faker.lorem.words(1) + Math.random().toString();
  partsContext.vars.subPart = faker.lorem.words(1);
  partsContext.vars.subVersion = faker.lorem.words(2);
  partsContext.vars.subQuantity = Math.random().toString();
  partsContext.vars.subMinutes = Math.random().toString();
  partsContext.vars.parts = partsContext.vars.partId;
  console.log('work plz', partsContext.vars.parts);
  // PARTS
  partsContext.vars.partId = faker.lorem.words(1) + Math.random().toString();
  partsContext.vars.partDescription = faker.lorem.words(5);
  partsContext.vars.partSub = true;
  partsContext.vars.partSrc = faker.lorem.words(2);
  partsContext.vars.partMfgNum = Math.random().toString();
  partsContext.vars.partPrice = Math.random().toString();
  partsContext.vars.partCategory = faker.lorem.words(3);
  partsContext.vars.partLocation = faker.lorem.words(3);
  partsContext.vars.partCount = Math.random().toString();
  partsContext.vars.partLongLead = false;
  partsContext.vars.partNotes = faker.lorem.words(3);
  partsContext.vars.subAssembly = '5beb5a73c8a0232118d33821';
  return done();
};
