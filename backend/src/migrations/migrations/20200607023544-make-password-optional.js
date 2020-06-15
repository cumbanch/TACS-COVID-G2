'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all(
      [
        queryInterface.changeColumn('users', 'password', {
          type: Sequelize.STRING,
          allowNull: true
        })
      ],
      queryInterface.addColumn('users', 'external', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })
    ),
  // no rollback it's possible for password
  down: queryInterface => queryInterface.removeColumn('users', 'external')
};
