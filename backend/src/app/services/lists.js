const { inspect } = require('util');

const logger = require('../logger');
const { moment } = require('../utils/moment');
const { List, CountryByList, sequelizeInstance, Country } = require('../models');
const { databaseError, notFound } = require('../errors/builders');
const { getCountry } = require('./countries');

const countriesMock = [
  {
    dataValues: {
      id: 1,
      name: 'Argentina',
      iso2: 'AR',
      iso3: 'ARG',
      latitude: -34,
      longitude: -64,
      createdAt: moment().format(),
      updatedAt: moment().format(),
      deletedAt: null
    }
  },
  {
    dataValues: {
      id: 2,
      name: 'Brazil',
      iso2: 'BR',
      iso3: 'BRA',
      latitude: -10,
      longitude: -55,
      createdAt: moment().format(),
      updatedAt: moment().format(),
      deletedAt: null
    }
  }
];

const listsMock = [
  {
    dataValues: {
      id: 1,
      name: 'Lista 1',
      createdAt: moment().format(),
      updatedAt: moment().format(),
      deletedAt: null
    },
    countries: countriesMock
  },
  {
    dataValues: {
      id: 2,
      name: 'Lista 2',
      createdAt: moment().format(),
      updatedAt: moment().format(),
      deletedAt: null
    },
    countries: countriesMock
  }
];

const getCountriesToDeleteAndCreate = (list, attributes) => {
  const countriesByListToDelete = list.countryByList.filter(
    countryByList => !attributes.countriesIds.includes(countryByList.countryId)
  );
  const countriesByListToKeep = list.countryByList.filter(countryByList =>
    attributes.countriesIds.includes(countryByList.countryId)
  );
  const countriesIdsToKeep = countriesByListToKeep.map(countryByList => countryByList.countryId);
  const countriesIdsToCreate = attributes.countriesIds.filter(
    countryId => !countriesIdsToKeep.includes(countryId)
  );
  const countriesByListToCreate = countriesIdsToCreate.map(countryId => ({
    listId: attributes.id,
    countryId
  }));
  return { countriesByListToDelete, countriesByListToCreate };
};

exports.getAllList = filters => {
  logger.info(`Attempting to get lists with filters: ${inspect(filters)}`);
  return List.findAndCountAll({
    where: {
      userId: filters.userId
    },
    offset: (filters.page - 1) * filters.limit,
    limit: filters.limit,
    order: filters.orderColumn ? [[filters.orderColumn, filters.orderType || 'ASC']] : undefined
  }).catch(error => {
    throw databaseError(`There was an error getting the lists: ${error.message}`);
  });
};

exports.getList = (filters, options = {}) => {
  logger.info(`Attempting to get list with filters: ${inspect(filters)}`);
  return List.findOne({
    where: {
      id: filters.id,
      userId: filters.userId
    },
    ...options
  }).catch(error => {
    throw databaseError(`There was an error getting the list: ${error.message}`);
  });
};

exports.deleteList = filters => {
  logger.info(`Attempting to delete list with filters: ${inspect(filters)}`);
  const options = { include: [{ model: CountryByList, as: 'countryByList' }] };
  return this.getList(filters, options).then(list => {
    if (!list) {
      throw notFound('The list was not found');
    }
    return sequelizeInstance
      .transaction(transaction =>
        Promise.all(
          list.countryByList.map(countryByList => countryByList.destroy({ transaction }))
        ).then(() => list.destroy({ transaction }))
      )
      .catch(error => {
        throw databaseError(`There was an error deleting the list: ${error.message}`);
      });
  });
};

exports.createList = attributes => {
  logger.info(`Attempting to create list with attributes: ${inspect(attributes)}`);
  return List.create(attributes).catch(error => {
    throw databaseError(`There was an error creating the list: ${error.message}`);
  });
};

exports.updateList = attributes => {
  logger.info(`Attempting to update list with attributes: ${inspect(attributes)}`);
  const options = { include: [{ model: CountryByList, as: 'countryByList' }] };
  return this.getList(attributes, options).then(list => {
    if (!list) {
      throw notFound('The list was not found');
    }
    return sequelizeInstance
      .transaction(transaction => {
        const { countriesByListToDelete, countriesByListToCreate } = getCountriesToDeleteAndCreate(
          list,
          attributes
        );
        return Promise.all([
          ...countriesByListToDelete.map(countryByList => countryByList.destroy({ transaction })),
          CountryByList.bulkCreate(countriesByListToCreate, { transaction })
        ]);
      })
      .catch(error => {
        throw databaseError(`There was an error updating the list: ${error.message}`);
      });
  });
};

exports.getCountriesByList = filters => {
  logger.info(`Attempting to get countries with filters: ${inspect(filters)}`);
  return this.getList(filters).then(list => {
    if (!list) {
      throw notFound('The list was not found');
    }
    return CountryByList.findAndCountAll({
      where: {
        listId: filters.id
      },
      offset: (filters.page - 1) * filters.limit,
      limit: filters.limit,
      order: filters.orderColumn ? [[filters.orderColumn, filters.orderType || 'ASC']] : undefined,
      include: [{ model: Country, as: 'country' }]
    })
      .then(countriesByList => ({
        rows: countriesByList.rows.map(countryByList => countryByList.country).filter(country => country),
        count: countriesByList.count
      }))
      .catch(error => {
        throw databaseError(`There was an error getting countries of the list: ${error.message}`);
      });
  });
};

exports.createCountriesByList = attributes => {
  logger.info(`Attempting to create countries by list with attributes: ${inspect(attributes)}`);
  return this.getList(attributes).then(list => {
    if (!list) {
      throw notFound('The list was not found');
    }
    return getCountry({ id: attributes.countryId }).then(country => {
      if (!country) {
        throw notFound('The country was not found');
      }
      return CountryByList.create({
        countryId: attributes.countryId,
        listId: attributes.id
      }).catch(error => {
        throw databaseError(`There was an error creating country of the list: ${error.message}`);
      });
    });
  });
};

exports.deleteCountriesByList = attributes => {
  logger.info(`Attempting to delete countries by list with attributes: ${inspect(attributes)}`);
  return this.getList(attributes)
    .then(list => {
      if (!list) {
        throw notFound('The list was not found');
      }
      return CountryByList.destroy({
        where: {
          countryId: attributes.countryId,
          listId: attributes.id
        }
      });
    })
    .catch(error => {
      throw databaseError(`There was an error deleting country of the list: ${error.message}`);
    });
};

exports.getCountriesByListBy = filters => {
  logger.info(`Attempting to get countries by list with filters: ${inspect(filters)}`);
  return Promise.resolve({ rows: listsMock[0], count: listsMock[0].countries.length });
};
