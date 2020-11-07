'use strict';
const _ = require('lodash');
const path = require('path');
const convert = require('convert-csv-to-json');

const fileName = path.join(__dirname, '../files/Filter Equipment.csv');
const filemaps = convert.formatValueByType().getJsonFromCsv(fileName);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // prepare data
    let data = [];
    let areas = _.uniq(_.map(filemaps, 'Location'));
    areas.map((el) => {
      return data.push({
        name : el
      })
    })

    await queryInterface.bulkInsert('areas', data , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('areas', null, {});
  }
};
