'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let users = []
    for(let i=1; i<= 10;i++){
      users.push(
        {
          nip : Math.floor(100000 + Math.random() * 900000),
          name: faker.name.findName(),
          phone: `08${Math.floor(1000000000 + Math.random() * 9000000000)}`,
          email: faker.internet.email(),
          password: faker.internet.password(32, false, /[0-9A-Z]/),
          status: 1,
          photo: faker.image.imageUrl(),
          role: "Engineer"
        }
      )
    }
    await queryInterface.bulkInsert('users', users , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
