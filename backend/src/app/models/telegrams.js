module.exports = (sequelize, DataTypes) => {
  const Telegram = sequelize.define(
    'Telegram',
    {
      chatId: { type: DataTypes.STRING, allowNull: false },
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
      deletedAt: DataTypes.DATE
    },
    { timestamps: true, underscored: true, paranoid: true, tableName: 'telegrams' }
  );
  Telegram.associate = models => {
    Telegram.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };
  return Telegram;
};
