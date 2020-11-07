'use strict';
const _ = require('lodash');
const path = require('path');
const convert = require('convert-csv-to-json');
const faker = require('faker');
const fileName = path.join(__dirname, '../files/Filter Equipment.csv');
const filemaps = convert.formatValueByType().getJsonFromCsv(fileName);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let id = 1;
    let drivers = []
    let drivens = []
    filemaps.map((el) => {
      let list_drivers = [el.mtr_OB,el.mtr_OBV,el.mtr_OBH,el.mtr_IB,el.mtr_IBV,el.mtr_IBH,el.mtr_A]
      drivers.push({
        equipment_id : null,
        vibration_id : null,
        OB : el.mtr_OB,
        OBV : el.mtr_OBV,
        OBH : el.mtr_OBH,
        IB : el.mtr_IB,
        IBV : el.mtr_IBV,
        IBH : el.mtr_IBH,
        A: el.mtr_A,
        max: list_drivers.max()
      })

      let list_drivens = [el.pmp_OB,el.pmp_OBV,el.pmp_OBH,el.pmp_IB,el.pmp_IBV,el.pmp_IBH,el.pmp_A]
      drivens.push({
        equipment_id : null,
        vibration_id : null,
        OB : el.pmp_OB,
        OBV : el.pmp_OBV,
        OBH : el.pmp_OBH,
        IB : el.pmp_IB,
        IBV : el.pmp_IBV,
        IBH : el.pmp_IBH,
        A: el.pmp_A,
        max: list_drivens.max()
      })
    });
    await queryInterface.bulkInsert('equipment_details', null , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('equipment_details', null, {});
  }
};
