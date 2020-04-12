'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable('countries', {
        id: {
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        iso2: {
          type: Sequelize.STRING,
          allowNull: false
        },
        iso3: {
          type: Sequelize.STRING,
          allowNull: false
        },
        latitude: {
          type: Sequelize.STRING,
          allowNull: false
        },
        longitude: {
          type: Sequelize.STRING,
          allowNull: false
        }
      })
      .then(() =>
        queryInterface
          .createTable('users', {
            id: {
              autoIncrement: true,
              primaryKey: true,
              allowNull: false,
              type: Sequelize.INTEGER
            },
            name: {
              type: Sequelize.STRING,
              allowNull: false
            },
            email: {
              type: Sequelize.STRING,
              allowNull: false
            },
            password: {
              type: Sequelize.STRING
            },
            last_access: {
              type: Sequelize.DATE,
              allowNull: false
            },
            country_id: {
              type: Sequelize.INTEGER,
              references: {
                model: 'countries',
                key: 'id'
              },
              allowNull: true
            },
            admin: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false
            },
            created_at: {
              type: Sequelize.DATE,
              allowNull: false
            },
            updated_at: {
              type: Sequelize.DATE,
              allowNull: false
            },
            deleted_at: Sequelize.DATE
          })
          .then(() =>
            queryInterface
              .createTable('lists', {
                id: {
                  autoIncrement: true,
                  primaryKey: true,
                  allowNull: false,
                  type: Sequelize.INTEGER
                },
                name: {
                  type: Sequelize.STRING,
                  allowNull: false
                },
                user_id: {
                  type: Sequelize.INTEGER,
                  references: {
                    model: 'users',
                    key: 'id'
                  },
                  allowNull: false
                },
                registred_at: {
                  type: Sequelize.DATE,
                  allowNull: false
                }
              })
              .then(() => {
                queryInterface.createTable('country_by_list', {
                  id: {
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                    type: Sequelize.INTEGER
                  },
                  country_id: {
                    type: Sequelize.INTEGER,
                    references: {
                      model: 'countries',
                      key: 'id'
                    },
                    allowNull: false
                  },
                  list_id: {
                    type: Sequelize.INTEGER,
                    references: {
                      model: 'lists',
                      key: 'id'
                    },
                    allowNull: false
                  },
                  created_at: {
                    type: Sequelize.DATE,
                    allowNull: false
                  },
                  updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false
                  },
                  deleted_at: Sequelize.DATE
                });
              })
          )
      ),
  down: queryInterface =>
    queryInterface
      .dropTable('country_by_list')
      .then(() =>
        queryInterface
          .dropTable('lists')
          .then(() => queryInterface.dropTable('users').then(() => queryInterface.dropTable('countries')))
      )
};
