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
            'equipment_type' : 0,
            'vib_alert': el.vib_alert,
            'vib_danger': el.vib_danger,
            'acc_alert' : el.acc_alert,
            'acc_danger' : el.acc_danger
        })
    })

    let vibration_limits = _.uniqBy(vibrations, el => [el.tag_no, el.vib_alert, el.vib_danger, el.acc_alert, el.acc_danger].join());
    await queryInterface.bulkInsert('vibration_limits', vibration_limits , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('vibration_limits', null, {});
  }
};
