'use strict';
const { QueryTypes } = require('sequelize');
const dbConfig = require('../../config/database');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sequelize = new Sequelize(dbConfig);
    const views = await sequelize.query(
      "CREATE VIEW actual_vibrations AS SELECT week_one, actual_vib FROM equipment_details",{ type: QueryTypes.SELECT }
    ); 
    return views
  }
};
