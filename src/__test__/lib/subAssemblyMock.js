'use strict';

const faker = require('faker');
const SubAssembly = require('../../model/sub-assembly');

const subAssemblyMock = module.exports = {};

subAssemblyMock.pCreateSubAssemblyMock = () => {
  return new SubAssembly({
    subId: faker.lorem.words(1) + Math.random().toString(),
    subPart: faker.lorem.words(1),
    subVersion: faker.lorem.words(2),
    subQuantity: Math.random().toString(),
    subMinutes: Math.random().toString(),
  }).save();
};

subAssemblyMock.pCleanSubAssemblyMocks = () => {
  return SubAssembly.remove({});
};
