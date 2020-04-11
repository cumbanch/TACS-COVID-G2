module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      lastAccess: { type: DataTypes.DATE },
      admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
      deletedAt: DataTypes.DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'users' }
  );
  User.associate = models => {
    User.belongsTo(models.Country, { as: 'userCountry', foreignKey: 'countryId' });
    User.hasMany(models.List, { as: 'userList', foreignKey: 'userId' });
  };
  return User;
};
