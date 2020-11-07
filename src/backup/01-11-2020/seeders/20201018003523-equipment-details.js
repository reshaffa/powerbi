'use strict';
const _ = require('lodash');
const path = require('path');
const convert = require('convert-csv-to-json');
const faker = require('faker');
const moment = require('moment');
const fileName = path.join(__dirname, '../files/Filter Equipment.csv');
const filemaps = convert.formatValueByType().getJsonFromCsv(fileName);
const { QueryTypes } = require('sequelize');
const dbConfig = require('../../config/database');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const sequelize = new Sequelize(dbConfig);
    /*
    const sequelize = new Sequelize(dbConfig);
    let users = await sequelize.query(" SELECT * FROM users",{ type: QueryTypes.SELECT }); 
    console.log(users);
    */
    let i = 1
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
            'vib_alert': el.vib_alert,
            'vib_danger': el.vib_danger,
            'acc_alert' : el.acc_alert,
            'acc_danger' : el.acc_danger
        })
    })
    let vibration_limits = _.uniqBy(vibrations, el => [el.tag_no, el.vib_alert, el.vib_danger, el.acc_alert, el.acc_danger].join());
    
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
      // if index <=9 maka driver && index > 9 maka driven
      // let init_type = (_.max(dvr_max) > _.max(dvn_max) ? "DRIVER" : _.max(dvr_max) == 0 || _.max(dvn_max) == 0 ? "-":"DRIVEN")
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

      let init_type = (_.isNaN(index_element) || _.max(init_max) === 0 ? "-" : index_element > 6 ? 'DRIVEN' : 'MOTOR')
      
      let status = _.filter(vibration_limits, function(x){ return x.tag_no == el.EquipmentID })
      
      let vib_status = 0
      if(parseFloat(_.max(dvr_max)) > 0 && parseFloat(_.max(dvr_max)) < parseFloat(status[0].vib_alert)){
        vib_status = 1 // is normal
      }else if(parseFloat(_.max(dvr_max)) >= parseFloat(status[0].vib_alert) && parseFloat(_.max(dvr_max)) < parseFloat(status[0].vib_danger)){
        vib_status = 2 // is alert
      }else if(parseFloat(_.max(dvr_max)) >= parseFloat(status[0].vib_danger)){
        vib_status = 3 // is danger
      }else{
        vib_status = 0
      }

      //console.log(vib_status);

      let acc_status = 0
      if(parseFloat(_.max(dvn_max)) > 0 && parseFloat(_.max(dvn_max)) < parseFloat(status[0].acc_alert)){
        acc_status = 1 // is normal
      }else if(parseFloat(_.max(dvn_max)) >= parseFloat(status[0].acc_alert) && parseFloat(_.max(dvn_max)) < parseFloat(status[0].acc_danger)){
        acc_status = 2 // is alert
      }else if(parseFloat(_.max(dvn_max)) >= parseFloat(status[0].acc_danger)){
        acc_status = 3 // is danger
      }else{
        acc_status = 0
      }

      let init_status = (
        vib_status == 2 && acc_status == 3 ? vib_status : 
        vib_status == 1 && acc_status == 2 || acc_status == 3, acc_status ? acc_status :
        vib_status == 1 && acc_status == 1 ? 1 : 0
      )

      let actual_vib = (
        vib_status == 2 && acc_status == 3 ? parseFloat(_.max(dvr_max)) : 
        vib_status == 1 && acc_status == 2 || acc_status == 3, acc_status ? parseFloat(_.max(dvn_max)) :
        vib_status == 1 && acc_status == 1 ? parseFloat(_.max(init_max)) : 0
      )

      //console.log(acc_status);

      /*
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
      */
    
    let numberOfweek = moment(el.LastDate,"MM-DD-YYYY").week();
    let year = moment(el.LastDate,"MM-DD-YYYY").year()
    let month = moment(el.LastDate,"MM-DD-YYYY").month() + 1
    
    let two_date = moment(el.LastDate).subtract(7,'d').format('YYYY-MM-DD');
    let two_month = moment(two_date,"YYYY-MM-DD").month()+1
    let two_myears = two_month+""+ moment(two_date,"YYYY-MM-DD").year();
    let two_number = moment(two_date,"YYYY-MM-DD").week();
    
    let three_date = moment(el.LastDate).subtract(14,'d').format('YYYY-MM-DD');
    let three_month = moment(three_date,"YYYY-MM-DD").month()+1
    let three_myears = three_month+""+ moment(three_date,"YYYY-MM-DD").year();
    let three_number = moment(three_date,"YYYY-MM-DD").week();
    
    let four_date = moment(el.LastDate).subtract(21,'d').format('YYYY-MM-DD');
    let four_month = moment(four_date,"YYYY-MM-DD").month()+1
    let four_myears = four_month+""+ moment(four_date,"YYYY-MM-DD").year();
    let four_number = moment(four_date,"YYYY-MM-DD").week();
    
    let week_one = (_.isEmpty(el.LastDate) ? '-' : `${el.EquipmentID.toString()}${month.toString()}${year.toString()}${numberOfweek.toString()}` )
    let week_two = (_.isEmpty(el.LastDate) ? '-' : `${el.EquipmentID.toString()}${two_myears.toString()}${two_number.toString()}`)
    let week_three = (_.isEmpty(el.LastDate) ? '-' : `${el.EquipmentID.toString()}${three_myears.toString()}${three_number.toString()}`)
    let week_four = (_.isEmpty(el.LastDate) ? '-' : `${el.EquipmentID.toString()}${four_myears.toString()}${four_number.toString()}`)
    
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
        week_one : week_one,
        week_two : week_two,
        week_three : week_three,
        week_four : week_four,
        actual_vib : parseFloat(actual_vib),
        max_level: parseFloat(_.max(init_max)),
        vib_status : parseInt(vib_status),
        acc_status : parseInt(acc_status),
        position : position, // logic of where an column name and driver name
        init_type : init_type,
        status : parseInt(init_status), // logic of point with vibration limitations
        indikasi : (el.indikasi ? el.indikasi.toString() : "-"),
        remark : (el.remark ? el.remark.toString() : "-"),
        saran : (el.saran ? el.saran.toString() : "-")
      })
    })

    await queryInterface.bulkInsert('equipment_details',equipments, {})
    
    /*
    let updated = [] 
    let params = []
    let id = 1;
    equipments.map(el => {
      let actual = await sequelize.query(`SELECT actual_vib FROM equipment_details WHERE initial_week='${el.last_week}'`,{ type: QueryTypes.SELECT }); 
      updated.push({
        last_vib : actual[0]
      })
      params.push({
        id : id++
      })
    })
    await queryInterface.bulkUpdate('equipment_details',updated, params, {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('equipment_details', null, {});
  }
};
