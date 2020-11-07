'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('equipment_details', {
      id: {
        allowNull : false,
        primaryKey : true,
        autoIncrement: true,
        type : Sequelize.INTEGER
      },
      equipment_id:{
        allowNull : false,
        type : Sequelize.INTEGER
      },
      driver_id: {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      driven_id : {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      dvr_OB: {
        type: Sequelize.FLOAT,
        defaultValue : 0
      },
      dvr_OBV: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      dvr_OBH: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      dvr_IB: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      dvr_IBV: {
        type: Sequelize.FLOAT,
        defaultValue : 0
      },
      dvr_IBH: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      dvr_A: {
        type: Sequelize.FLOAT,
        defaultValue : 0
      },
      dvn_OB: {
        type: Sequelize.FLOAT,
        defaultValue : 0
      },
      dvn_OBV: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      dvn_OBH: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      dvn_IB: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      dvn_IBV: {
        type: Sequelize.FLOAT,
        defaultValue : 0
      },
      dvn_IBH: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      dvn_A: {
        type: Sequelize.FLOAT,
        defaultValue : 0
      },
      dvr_max: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      dvn_max: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      week_code : {
        allowNull : false,
        type : Sequelize.INTEGER,
        defaultValue : 0
      },
      week_one : {
        allowNull : true,
        type : Sequelize.STRING
      },
      week_two : {
        allowNull : true,
        type : Sequelize.STRING
      },
      week_three : {
        allowNull : true,
        type : Sequelize.STRING
      },
      week_four : {
        allowNull : true,
        type : Sequelize.STRING
      },
      actual_vib : {
        type : Sequelize.FLOAT,
        defaultValue: 0
      },
      /*
      last_vib : {
        allowNull : true,
        type : Sequelize.FLOAT
      },
      danger_loop : {
        allowNull : true,
        type : Sequelize.INTEGER
      },
      */
      max_level:{
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      position:{
        type : Sequelize.STRING,
        defaultValue: null
      },
      init_type : {
        type : Sequelize.STRING,
        defaultValue : '-'
      },
      vib_status : {
        allowNull : false,
        type : Sequelize.INTEGER,
        defaultValue : 0
      },
      acc_status : {
        allowNull : false,
        type : Sequelize.INTEGER,
        defaultValue: 0
      },
      status : {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      indikasi: {
        type: Sequelize.STRING,
        defaultValue: "-"
      },
      remark: {
        type: Sequelize.STRING,
        defaultValue: "-"
      },
      saran: {
        type: Sequelize.STRING,
        defaultValue: "-"
      },
      createdAt: {
        allowNull: false,
        type: 'DATETIME',
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: 'DATETIME',
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('equipment_details');
  }
};