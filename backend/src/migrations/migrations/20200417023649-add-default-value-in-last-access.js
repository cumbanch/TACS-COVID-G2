'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.changeColumn('users', 'last_access', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      }),
      queryInterface.addColumn('users', 'last_name', {
        type: Sequelize.STRING,
        allowNull: false
      })
    ]),
  down: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.changeColumn('users', 'last_access', {
        type: Sequelize.DATE,
        allowNull: false
      }),
      queryInterface.removeColumn('users', 'last_name')
    ])
};
