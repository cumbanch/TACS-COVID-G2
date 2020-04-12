module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    'List',
    {
      name: { type: DataTypes.STRING, allowNull: false },
      registerAt: { type: DataTypes.DATE, allowNull: false }
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'lists' }
  );
  List.associate = models => {
    List.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
    List.belongsToMany(models.Country, {
      as: 'countries',
      through: 'CountryByList',
      foreignKey: 'listId'
    });
    List.hasMany(models.CountryByList, { as: 'countryByList', foreignKey: 'listId' });
  };
  return List;
};
