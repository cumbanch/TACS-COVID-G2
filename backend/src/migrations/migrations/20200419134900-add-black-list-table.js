'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('tokens_blacklist', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      access_token: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
      }
    }),
  down: queryInterface => queryInterface.dropTable('tokens_blacklist')
};
