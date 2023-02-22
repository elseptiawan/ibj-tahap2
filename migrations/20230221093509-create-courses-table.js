'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('courses', {
      id: {
        type : Sequelize.BIGINT,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
      },
      title : {
        type : Sequelize.STRING,
        allowNull : false
      },
      course_category_id : {
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
    await queryInterface.dropTable('courses');
  }
};
