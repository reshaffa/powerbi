'use strict';
const _ = require('lodash');
const path = require('path');
const convert = require('convert-csv-to-json');
const faker = require('faker');
const moment = require('moment');
const { initial } = require('lodash');
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

    let vibrations = []
    let start = 1;
    _.map(filemaps, el => {
        return vibrations.push({
            'id' : start++,
            'tag_no' : el.EquipmentID,
            'equipment_type' : 0,
            'alert': el.Alert,
            'danger': el.Danger
        })
    })

    let vibration_buckets = _.uniqBy(vibrations, el => [el.tag_no, el.alert, el.danger].join());

    let equipments = [];
    filemaps.map((el) => {
      
      let area =  _.filter(data, function(a){ return  a.name == el.Location})
      let vibration =  _.filter(vibration_buckets, function(x){ return  x.tag_no == el.EquipmentID && x.equipment_type === 0 })
      // console.log(JSON.parse(JSON.stringify(area)))
      let compare_date =  (_.isEmpty(el.LastDate) ? null : new Date(el.LastDate))
      let initial_date = (_.isDate(compare_date) ? moment(compare_date).format('YYYY-MM-DD'): null);
      //console.log(initial_date)
      equipments.push({
        tag_no : el.EquipmentID,
        user_id : faker.random.number({min:1, max:10}),
        area_id : area[0].id,
        vibration_id : vibration[0].id,
        equipment_type : 0,
        initial_date: initial_date
      })
    });
    await queryInterface.bulkInsert('equipments',equipments, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('equipments', null, {});
  }
};
