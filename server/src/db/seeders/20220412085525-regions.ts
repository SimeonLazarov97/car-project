'use strict';

module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkInsert('Regions', [
      { name: 'Africa' },
      { name: 'South America' },
      { name: 'North America' },
      { name: 'Europe' },
      { name: 'Asia' },
      { name: 'Australia' }
    ], {});
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkDelete('Regions', null, {});
  }
};
