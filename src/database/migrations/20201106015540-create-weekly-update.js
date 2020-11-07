'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('weekly_update', {
      week_one: {
        primaryKey : true,
        allowNull : false,
        type: Sequelize.STRING
      },
      w1status : {
        type : Sequelize.INTEGER,
        defaultValule : 0
      },
      w2status : {
        type : Sequelize.INTEGER,
        defaultValule : 0
      },
      w3status : {
        type : Sequelize.INTEGER,
        defaultValule : 0
      },
      w4status : {
        type : Sequelize.INTEGER,
        defaultValule : 0
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('weekly_update');
  }
};