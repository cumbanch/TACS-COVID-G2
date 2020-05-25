const {
  USER_ROLES: { ADMIN }
} = require('../../app/utils/constants');
const { initialPasswordAdmin } = require('../../config').server;
const { hashPassword } = require('../../app/services/sessions');

module.exports = {
  up: async queryInterface =>
    queryInterface.bulkInsert('users', [
      {
        name: 'admin',
        email: 'admin@tacs.grupo2.com.ar',
        last_name: 'admin',
        password: await hashPassword(initialPasswordAdmin),
        type: ADMIN,
        created_at: queryInterface.sequelize.literal('NOW()'),
        updated_at: queryInterface.sequelize.literal('NOW()')
      }
    ]),

  down: queryInterface => queryInterface.bulkDelete('users', { type: ADMIN })
};
