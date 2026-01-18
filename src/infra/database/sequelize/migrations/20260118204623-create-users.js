'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      password: {
        type: sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, sequelize) {
    await queryInterface.dropTable('users');
  }
};