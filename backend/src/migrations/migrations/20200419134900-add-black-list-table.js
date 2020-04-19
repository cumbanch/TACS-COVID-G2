'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.createTable('tokens_black_list', {
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
      queryInterface.changeColumn('users', 'email', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      })
    ]),
  down: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.dropTable('tokens_black_list'),
      queryInterface.changeColumn('users', 'email', {
        type: Sequelize.STRING,
        allowNull: false
      })
    ])
};
