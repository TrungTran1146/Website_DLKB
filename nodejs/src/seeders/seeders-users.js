'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@gmail.com',
      password: '123456',//plain text ->hash pass
      firstName: 'khaitran',
      lastName: 'khai',
      address: 'VN',
      gender:'1',
      typeRole:'ROLE',
      keyRole:'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
