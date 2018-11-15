'use strict';

const faker = require('faker');
const subAssemblyMock = require('./subAssemblyMock');
const Part = require('../../model/part');


const partMock = module.exports = {};

partMock.pCreatePartMock = () => {
  const resultMock = {};

  return subAssemblyMock.pCreateSubAssemblyMock()
    .then((createdSubAssemblyMock) => {
      resultMock.subAssembly = createdSubAssemblyMock;

      return new Part({
        partId: faker.lorem.words(5), // eslint-disable-line
        partDescription: faker.lorem.words(5),
        partSub: true,
        partSrc: faker.lorem.words(2),
        partMfgNum: Math.random().toString(),
        partPrice: Math.random().toString(),
        partCategory: faker.lorem.words(3),
        partLocation: faker.lorem.words(3),
        partCount: Math.random().toString(),
        partLongLead: false,
        partNotes: faker.lorem.words(3),
        subAssembly: '5beb5a73c8a0232118d33821',
      }).save();
    })
    .then((createdPartMock) => {
      resultMock.part = createdPartMock;
      return resultMock;
    });
};

partMock.pCleanPartMocks = () => {
  return Promise.all([
    Part.remove({}),
    subAssemblyMock.pCleanSubAssemblyMocks(),
  ]);
};
