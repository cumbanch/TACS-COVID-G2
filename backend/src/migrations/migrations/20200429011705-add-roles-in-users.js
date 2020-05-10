const {
  USER_ROLES: { REGULAR }
} = require('../../app/utils/constants');

module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.removeColumn('users', 'admin'),
      queryInterface.addColumn('users', 'type', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: REGULAR
      })
    ]),

  down: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.removeColumn('users', 'type'),
      queryInterface.addColumn('users', 'admin', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      })
    ])
};
