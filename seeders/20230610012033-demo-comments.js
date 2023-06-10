'use strict';

const { Sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      { message: "This is my seeder comment.  Great job.  You are going to be rich and happy and have everything you want!", name: "Pita", blogID:1,createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Comments", null, {})
  }
};
