'use strict';

const queryData = {};

queryData.find = (Model, findOptions) => {
  const testQuery = Model.find({});
  // find option syntax is space delimited
  // e.g. 'username securityQuestion etc.'
  return testQuery.select(findOptions);
};

queryData.query = (function (data, callback) {
  const queryContainer = {};
  // execute the query at a later time
  data.exec(function (error, search) { //eslint-disable-line
    if (error) {
      callback(error);
    }

    for (let loopQueryList = 0; loopQueryList <= search.length - 1; loopQueryList++) {
      queryContainer[`${loopQueryList}`] = search[loopQueryList];
    }
    // uncomment for debugging
    console.log(queryContainer);
    // nameOfProperty is generic, your dataset will be unique depending on the query
    // uncomment for debugging
    // console.log(queryContainer['0'].nameOfProperty);
    // console.log(queryContainer['1'].nameOfProperty);
    callback(queryContainer);
  });
});

module.exports = queryData;
