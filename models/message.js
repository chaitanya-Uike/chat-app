const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User);
      Message.belongsTo(models.User);
    }
  }
  Message.init(
    {},
    {
      sequelize,
      freezeTableName: true,
    }
  );

  return Message;
};
