'use strict';
const _ = require('lodash');
const path = require('path');
const convert = require('convert-csv-to-json');
const faker = require('faker');
const fileName = path.join(__dirname, '../files/Filter Equipment.csv');
const filemaps = convert.formatValueByType().getJsonFromCsv(fileName);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    let data = [];
    let areas = _.uniq(_.map(filemaps, 'Location'));
    let i = 1;
    areas.map((el) => {
      return data.push({
        id : i++,
        name : el
      })
    })

    let equipments = [];
    filemaps.map((el) => {
      
      let area =  _.filter(data, function(a){ return  a.name == el.Location})
      // console.log(JSON.parse(JSON.stringify(area)))
      // let initial_date = (el.LastDate == "" ? "NULL" : `${el.LastDate.substr(6,10)}-${el.LastDate.substr(3,2)}-${el.LastDate.substr(0,2)}`)
      equipments.push({
        tag_no : el.EquipmentID,
        user_id : faker.random.number(10,1),
        area_id : area[0].id,
        equipment_type : 0,
        indikasi: (el.indikasi ? el.indikasi.toString() : null),
        remark: (el.remark ? el.remark.toString() : null),
        saran: (el.saran ? el.saran.toString() : null),
        initial_date: (el.LastDate ? el.LastDate : null)
      })
    });
    await queryInterface.bulkInsert('equipments',equipments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('equipments', null, {});
  }
};
