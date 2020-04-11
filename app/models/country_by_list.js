module.exports = sequelize => {
  const CountryByList = sequelize.define(
    'CountryByList',
    {},
    { timestamps: true, underscored: true, paranoid: true, tableName: 'country_by_list' }
  );

  CountryByList.associate = models => {
    CountryByList.belongsTo(models.Country, { as: 'country', foreignKey: 'countryId' });
    CountryByList.belongsTo(models.List, { as: 'list', foreignKey: 'listId' });
  };

  return CountryByList;
};
