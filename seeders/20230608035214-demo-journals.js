'use strict';

const { Sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Journals', [
      { title: "First Post - Testing Blog API", entry: "This is my first blog post and I'm checking to see if it works.  Wish me success!", link:'https://github.com/PBadila/express-passport-sequelize-csa/blob/main/03-migrations-and-seeders.md',topic:"test",createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Journals", null, {})
  }
};
