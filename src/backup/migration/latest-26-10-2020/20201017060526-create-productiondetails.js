'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('production_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      production_id: {
        allowNull : false,
        type: Sequelize.INTEGER
      },
      amper_rpm: {
        allowNull : true,
        type: Sequelize.INTEGER
      },
      such_press: {
        allowNull : true,
        type: Sequelize.INTEGER
      },
      disch_press: {
        allowNull : true,
        type: Sequelize.INTEGER
      },
      flow: {
        allowNull : true,
        type: Sequelize.INTEGER
      },
      oil_level: {
        allowNull : true,
        type: Sequelize.STRING
      },
      seal_leakage: {
        allowNull : true,
        type: Sequelize.INTEGER
      },
      ob_drv: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      ib_drv: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      wending_body: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      ib_drvn: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      ob_drvn: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      ib_gb: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      ob_gb: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      max_driver: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      max_driven: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      max_gearbox: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('production_details');
  }
};