'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('equipment_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      equipment_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      vibration_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      OB: {
        type: Sequelize.DECIMAL,
        defaultValue : 0
      },
      OBV: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      OBH: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      IB: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      IBV: {
        type: Sequelize.DECIMAL,
        defaultValue : 0
      },
      IBH: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      A: {
        type: Sequelize.DECIMAL,
        defaultValue : 0
      },
      max: {
        type: Sequelize.DECIMAL,
        defaultValue: 0
      },
      indikasi: {
        allowNull: true,
        type: Sequelize.STRING
      },
      remark: {
        allowNull: true,
        type: Sequelize.STRING
      },
      saran: {
        allowNull: true,
        type: Sequelize.STRING
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