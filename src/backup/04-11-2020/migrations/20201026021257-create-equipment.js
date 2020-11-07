'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('equipments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tag_no: {
        allowNull : false,
        type: Sequelize.STRING
      },
      equipment_type: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      area_id: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      vibration_id: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      last_date : {
        type : 'DATE',
        allowNull : true
      },
      initial_date: {
        type: 'DATE',
        allowNull : false
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
    await queryInterface.dropTable('equipments');
  }
};