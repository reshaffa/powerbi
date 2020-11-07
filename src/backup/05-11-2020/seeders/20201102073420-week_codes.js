'use strict';
const _ = require('lodash');
const path = require('path');
const convert = require('convert-csv-to-json');
const faker = require('faker');
const moment = require('moment');
const fileName = path.join(__dirname, '../files/New Filter Equipment.csv');
const filemaps = convert.formatValueByType().getJsonFromCsv(fileName);

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let data = []
    let areas = _.uniq(_.map(filemaps, 'Location'));
    let i = 1;
    areas.map((el) => {
      return data.push({
        id : i++,
        name : el
      })
    })

    let week_codes = []
    filemaps.map((el) => {
      let area =  _.filter(data, function(a){ return  a.name == el.Location})
      /*
      let week_number = (_.isEmpty(el.initial_date) ? "" : moment(el.initial_date,"MM-DD-YYYY").week());
      let year_number = (_.isEmpty(el.initial_date) ? "" : moment(el.initial_date,"MM-DD-YYYY").year());
      let month_number = (_.isEmpty(el.initial_date) ? "" : moment(el.initial_date,"MM-DD-YYYY").month() + 1);
      let week_code = (_.isEmpty(el.initial_date) ? "" : `${month_number.toString()+""+year_number.toString()+""+week_number.toString()}`)
      
      if(_.isEmpty(week_code)===false){
          week_codes.push({
            week_code : parseInt(week_code),
            area_id : area[0].id
          })
      }
      */
     let week_number = moment(el.initial_date,"MM-DD-YYYY").week()
     let year_number = moment(el.initial_date,"MM-DD-YYYY").year()
     let month_number = moment(el.initial_date,"MM-DD-YYYY").month() + 1
     let week_code = `${month_number.toString()+""+year_number.toString()+""+week_number.toString()}`
      week_codes.push({
        week_code : parseInt(week_code),
        area_id : area[0].id
      })
    })

    let weeks = _.uniqBy(week_codes, el => [el.week_code, el.area_id].join());
    //console.log(weeks);
    await queryInterface.bulkInsert('week_by_areas', weeks, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('week_by_areas', null, {});
  }
};
