module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define(
    'Country',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      iso2: { type: DataTypes.STRING, allowNull: false },
      iso3: { type: DataTypes.STRING, allowNull: false },
      latitude: { type: DataTypes.STRING, allowNull: false },
      longitude: { type: DataTypes.STRING, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
      deletedAt: DataTypes.DATE
    },
    { timestamps: true, underscored: true, paranoid: true }
  );
  Country.associate = models => {
    Country.belongsToMany(models.List, {
      as: 'lists',
      through: 'CountryByList',
      foreignKey: 'countryId'
    });
    Country.hasMany(models.CountryByList, { as: 'listByCountry', foreignKey: 'countryId' });
  };
  return Country;
};
