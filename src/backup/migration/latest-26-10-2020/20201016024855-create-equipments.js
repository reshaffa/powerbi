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
        allowNull: false,
        type: Sequelize.STRING
      },
      equipment_type : { // 0 is equipment & 1 is productions
        type : Sequelize.INTEGER,
        defaultValue : 0
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      area_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      vibration_id : {
        allowNull : false,
        type : Sequelize.INTEGER
      },
      initial_date: {
        allowNull: true,
        type: 'DATE'
      },
      week_number : {
        allowNull : true,
        type : Sequelize.INTEGER
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