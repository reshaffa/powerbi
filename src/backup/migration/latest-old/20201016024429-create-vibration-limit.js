'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vibration_limits', {
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
      //driver:{
      //  allowNull : false,
      //  type : Sequelize.STRING
      //},
      //driven:{
      //  allowNull: false,
      //  type: Sequelize.STRING
      //},
      alert: {
        defaultValue : 0,
        type: Sequelize.FLOAT
      },
      danger: {
        defaultValue : 0,
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('vibration_limits');
  }
};