'use strict';
const _ = require('lodash');
const path = require('path');
const convert = require('convert-csv-to-json');
const faker = require('faker');
const fileName = path.join(__dirname, '../files/Filter Equipment.csv');
const filemaps = convert.formatValueByType().getJsonFromCsv(fileName);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let vibrations = []
    let drivens = _.uniq(_.map(filemaps, 'driven'));
    drivens.map((el) => {
      return vibrations.push({
        name : el,
        description : faker.lorem.words(3)
      })
    })
    await queryInterface.bulkInsert('drivens', vibrations, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('drivens', null, {});
  }
};
