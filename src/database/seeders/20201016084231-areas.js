'use strict';
const _ = require('lodash');
const path = require('path');
const convert = require('convert-csv-to-json');

const fileName = path.join(__dirname, '../files/New Filter Equipment.csv');
const filemaps = convert.formatValueByType().getJsonFromCsv(fileName);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // prepare data
    let data = [];
    let areas = _.uniq(_.map(filemaps, 'Location'));
    areas.map((el) => {
      return data.push({
        area_type : 0,
        name : el
      })
    })

    await queryInterface.bulkInsert('areas', data , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('areas', null, {});
  }
};
