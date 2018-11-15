'use strict';

const faker = require('faker');
const partMock = require('./part-mock');
const SubAssembly = require('../../model/sub-assembly');


const subAssemblyMock = module.exports = {};

subAssemblyMock.pCreateSubAssemblyMock = () => {
  const resultMock = {};

  return partMock.pCreatePartMock()
    .then((createdSubAssemblyMock) => {
      resultMock.subAssembly = createdSubAssemblyMock;

      return new SubAssembly({
        subId: faker.lorem.words(1) + Math.random().toString(),
        subPart: faker.lorem.words(1),
        subVersion: faker.lorem.words(2),
        subQuantity: Math.random().toString(),
        subMinutes: Math.random().toString(),
        parts: '6beb5a73c8a0232118d33821',
      }).save();
    })
    .then((createdSubAssemblyMock) => {
      resultMock.part = createdSubAssemblyMock;
      return resultMock;
    });
};

subAssemblyMock.pCleanSubAssemblyMocks = () => {
  return Promise.all([
    SubAssembly.remove({}),
    partMock.pCleanPartMocks(),
  ]);
};
