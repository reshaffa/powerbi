'use strict';
const { QueryTypes } = require('sequelize');
const dbConfig = require('../../config/database');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sequelize = new Sequelize(dbConfig);
    const store_procedure = await sequelize.query(
      `CREATE OR ALTER PROCEDURE [dbo].[weekly_status] AS 
      
      select 
        week_one,
        status
      into #temp 
      from dbo.equipment_details
      
      select
      a.week_one,
      b.week_two,
      a.status
      into #tempA
      from #temp a inner join equipment_details b on a.week_one = b.week_two
      
      select
      a.week_one,
      c.week_three,
      a.status
      into #tempB
      from #temp a inner join equipment_details c on a.week_one = c.week_three
      
      select
      a.week_one,
      d.week_four,
      a.status
      into #tempD
      from #temp a inner join equipment_details d on a.week_one = d.week_four
      
      select 
        a.week_one, 
        ISNULL(a.status, 0) AS w1status, ISNULL(b.status,0) AS w2status ,ISNULL(c.status,0) AS w3status, ISNULL(d.status,0) AS w4status
      into #lasttemp
      from #temp a 
      left join #tempA b on a.week_one = b.week_one
      left join #tempB c on a.week_one = c.week_one
      left join #tempD d on a.week_one = d.week_one
      
      TRUNCATE TABLE weekly_update
      
      INSERT INTO weekly_update (week_one, w1status, w2status, w3status, w4status)
      
      select week_one, w1status, w2status, w3status, w4status
      
      from #lasttemp
      EXECUTE [dbo].[weekly_status]
      `,{ type: QueryTypes.SELECT }
    ); 
    return store_procedure
  }
};