'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('drivens', {
      id : {
        allowNull : false,
        primaryKey: true,
        autoIncrement : true,
        type : Sequelize.INTEGER
      },
      name : {
        allowNull : false,
        type : Sequelize.STRING
      },
      description: {
        allowNull : false,
        type : Sequelize.STRING
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
    await queryInterface.dropTable('drivens');
  }
};