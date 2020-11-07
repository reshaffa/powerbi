'use strict';
const _ = require('lodash');
const path = require('path');
const convert = require('convert-csv-to-json');
const faker = require('faker');
const fileName = path.join(__dirname, '../files/Filter Equipment.csv');
const filemaps = convert.formatValueByType().getJsonFromCsv(fileName);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let i = 1;

    // get data drivers
    let driver_buckets = [];
    let drivers = _.uniq(_.map(filemaps, 'driver'));
    let xa = 1;
    drivers.map((el) => {
      return driver_buckets.push({
        id : xa++,
        driver : el
      })
    })

    // get data drivens
    let driven_buckets = [];
    let drivens = _.uniq(_.map(filemaps, 'driven'));
    let xb = 1;
    drivens.map((el) => {
      return driven_buckets.push({
        id : xb++,
        driven : el
      })
    })

    let vibrations = []
    _.map(filemaps, el => {
        return vibrations.push({
            'tag_no' : el.EquipmentID,
            'equipment_type' : 0,
            'alert': el.Alert,
            'danger': el.Danger
        })
    })
    let vibration_limits = _.uniqBy(vibrations, el => [el.tag_no, el.alert, el.danger].join());

    let equipments = []
    filemaps.map((el) => {
      // init driver and driven
      let driver =  _.filter(driver_buckets, function(x){ return  x.driver == el.driver})
      let driven =  _.filter(driven_buckets, function(x){ return  x.driven == el.driven})
      // vibration categories
      let categories = ['OBV','OBH','IBV','IBH','A','OBV','OBH','IBV','IBH','A','OB (g)','IB (g)','OB (g)','IB (g)']
      let dvr_max = [el.dvr_OBV, el.dvr_OBH, el.dvr_IBV, el.dvr_IBH, el.dvr_A, el.dvn_OBV, el.dvn_OBH, el.dvn_IBV, el.dvn_IBH, el.dvn_A]
      // accelerator categories
      let dvn_max = [el.dvr_OB, el.dvr_IB, el.dvn_OB, el.dvn_IB]
      
      // get index from driver and driven
      let join_element = dvr_max.concat(dvn_max); 
      let init_max = [_.max(dvr_max), _.max(dvn_max)];
      let index_element = join_element.indexOf(_.max(init_max));

      let position = null
      if(_.isNaN(index_element) || _.max(init_max) === 0){
        position = "-"
      }else{
        position = (index_element > 6 ? `${categories[index_element]+' '+el.driven}` : `${categories[index_element]+' '+el.driver}`)
      }
      
      let status = _.filter(vibration_limits, function(x){ return x.tag_no == el.EquipmentID })

      // get status normal alert or danger
      let is_status = null
      if(parseFloat(_.max(dvr_max)) > 0 && parseFloat(_.max(dvr_max)) < status[0].alert){
        is_status = 1 // is normal
      }else if(parseFloat(_.max(dvr_max)) >= status[0].alert && parseFloat(_.max(dvr_max)) < status[0].danger){
        is_status = 2 // is alert
      }else if(parseFloat(_.max(dvr_max)) >= status[0].danger){
        is_status = 3 // is danger
      }else{
        is_status = 0
      }

      equipments.push({
        equipment_id : i++,
        driver_id : driver[0].id,
        driven_id : driven[0].id,
        dvr_OB : el.dvr_OB,
        dvr_OBV : el.dvr_OBV,
        dvr_OBH : el.dvr_OBH,
        dvr_IB : el.dvr_IB,
        dvr_IBV : el.dvr_IBV,
        dvr_IBH : el.dvr_IBH,
        dvr_A : el.dvr_A,
        dvn_OB : el.dvn_OB,
        dvn_OBV : el.dvn_OBV,
        dvn_OBH : el.dvn_OBH,
        dvn_IB : el.dvn_IB,
        dvn_IBV : el.dvn_IBV,
        dvn_IBH : el.dvn_IBH,
        dvn_A : el.dvn_A,
        dvr_max : parseFloat(_.max(dvr_max)),
        dvn_max : parseFloat(_.max(dvn_max)),
        max_level: parseFloat(_.max(init_max)),
        position : position, // logic of where an column name and driver name
        status : is_status, // logic of point with vibration limitations
        indikasi : (el.indikasi ? el.indikasi.toString() : "-"),
        remark : (el.remark ? el.remark.toString() : "-"),
        saran : (el.saran ? el.saran.toString() : "-")
      })
    })
    //console.log(equipments)
    await queryInterface.bulkInsert('equipment_details',equipments, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('equipment_details', null, {});
  }
};
