const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const generateUsername = require("../lib/randomNameGenerator");
const generateAvatar = require("../lib/randomAvatarGenerator");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async comparePassword(candidatePassword) {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
    }

    static associate(models) {}
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue("password", hash);
        },
      },
      username: {
        type: DataTypes.STRING,
        defaultValue: generateUsername,
      },
      profilePic: {
        type: DataTypes.STRING,
        defaultValue: generateAvatar,
      },
      latitude: {
        type: DataTypes.FLOAT,
      },
      longitude: {
        type: DataTypes.FLOAT,
      },
    },
    {
      sequelize,
      freezeTableName: true,
    }
  );

  return User;
};
