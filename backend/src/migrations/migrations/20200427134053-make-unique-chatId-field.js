'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('telegrams', 'chat_id', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('telegrams', 'chat_id', {
      type: Sequelize.STRING,
      allowNull: false
    })
};
