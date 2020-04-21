module.exports = (sequelize, DataTypes) => {
  const TokenBlackList = sequelize.define(
    'TokenBlacklist',
    {
      accessToken: { type: DataTypes.TEXT, allowNull: false }
    },
    { underscored: true, tableName: 'tokens_blacklist', timestamps: false, paranoid: false }
  );
  return TokenBlackList;
};
