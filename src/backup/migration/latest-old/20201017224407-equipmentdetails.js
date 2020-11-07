'use strict';

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
      max_level:{
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      position:{
        type : Sequelize.STRING,
        defaultValue: null
      },
      status : {
        type: Sequelize.STRING,
        defaultValue: null
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
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('equipment_details');
  }
};
