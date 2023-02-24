const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, {
        foreignKey: "senderId",
      });
      Message.belongsTo(models.User, {
        foreignKey: "recieverId",
      });
    }
  }
  Message.init(
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );

  return Message;
};
