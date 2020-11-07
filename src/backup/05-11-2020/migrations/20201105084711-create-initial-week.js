'use strict';
const { QueryTypes } = require('sequelize');
const dbConfig = require('../../config/database');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sequelize = new Sequelize(dbConfig);
    const views = await sequelize.query(
      `CREATE VIEW initial_weeks AS 
      SELECT DISTINCT 
      ed.week_code,
      UPPER(convert(char(3), eq.initial_date, 0)+' W'+convert( char(2), datepart(day, datediff(day, 0, eq.initial_date)/7 * 7)/7 + 1)) AS description
      FROM equipment_details ed
      INNER JOIN equipments eq on eq.id = ed.equipment_id`,{ type: QueryTypes.SELECT }
    ); 
    return views
  }
};