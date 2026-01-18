'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        type: sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: sequelize.TEXT,
        allowNull: false,
      },
      author_id: {
        type: sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

  async down(queryInterface) {
    await queryInterface.dropTable('posts');
  }
};