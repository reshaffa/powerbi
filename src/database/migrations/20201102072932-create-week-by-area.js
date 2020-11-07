'use strict';
const { QueryTypes } = require('sequelize');
const dbConfig = require('../../config/database');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sequelize = new Sequelize(dbConfig);
    const views = await sequelize.query(
      `CREATE OR VIEW week_by_areas AS SELECT  DISTINCT 
        ed.week_code, 
        eq.area_id
      FROM equipments eq
      INNER JOIN equipment_details ed ON ed.equipment_id= eq.id`,{ type: QueryTypes.SELECT }
    ); 
    return views
  }
};