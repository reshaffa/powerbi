'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('week_by_areas', {
      week_code: {
        primaryKey : true,
        allowNull : false,
        type: Sequelize.INTEGER
      },
      area_id: {
        primaryKey : true,
        allowNull : false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('week_by_areas');
  }
};