'use strict';
const _ = require('lodash');
const path = require('path');
const convert = require('convert-csv-to-json');

const fileName = path.join(__dirname, '../files/Filter Equipment.csv');
const filemaps = convert.formatValueByType().getJsonFromCsv(fileName);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let vibrations = []
    _.map(filemaps, el => {
        return vibrations.push({
            'tag_no' : el.EquipmentID,
            'alert': el.Alert,
            'danger': el.Danger
        })
    })

    let vibration_limits = _.uniqBy(vibrations, el => [el.tag_no, el.alert, el.danger].join());
    await queryInterface.bulkInsert('vibration_limits', vibration_limits , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vibration_limits', null, {});
  }
};
