'use strict';

module.exports = {
  up: queryInterface => queryInterface.removeColumn('users', 'country_id'),
  down: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'country_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'countries',
        key: 'id'
      },
      allowNull: true
    })
};
