'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_courses', {
      id: {
        type : Sequelize.BIGINT,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
      },
      users_id : {
        type : Sequelize.BIGINT,
        allowNull : false
      },
      course_id : {
        type : Sequelize.BIGINT,
        allowNull : false
      },
      createdAt : {
        type : Sequelize.DATE,
        allowNull : false
      },
      updatedAt : {
        type : Sequelize.DATE,
        allowNull : false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_courses');
  }
};
