module.exports = (sequelize, DataTypes) => {
  const TokenBlackList = sequelize.define(
    'TokenBlackList',
    {
      accessToken: { type: DataTypes.TEXT, allowNull: false }
    },
    { underscored: true, tableName: 'tokens_black_list', timestamps: false, paranoid: false }
  );
  return TokenBlackList;
};
