const { User, sequelize } = require("../models");
const { Op } = require("sequelize");

class LocationService {
  getUsersInProximity(id, latitude, longitude) {
    // get users which are active and within 1km radius of passed cordinates
    const cordinatesNotNullCheck = {
      [Op.and]: [
        {
          latitude: {
            [Op.not]: null,
          },
        },
        {
          longitude: {
            [Op.not]: null,
          },
        },
      ],
    };

    // only get users within radius of 1000m (1km)
    const proximityCheck = sequelize.fn(
      "ST_DWithin",
      sequelize.literal("ST_MakePoint(latitude, longitude)"),
      sequelize.literal(
        "ST_MakePoint(" + latitude + "," + longitude + ")::geography"
      ),
      1000
    );

    // const distance = sequelize.fn(
    //   "ST_Distance_Sphere",
    //   sequelize.literal("ST_MakePoint(latitude, longitude)"),
    //   sequelize.literal(`ST_MakePoint(${latitude},${longitude})`)
    // );

    // only get users who were updated in the last 2 mins
    const userStatusCheck = {
      updatedAt: {
        [Op.gte]: sequelize.literal("NOW() - (INTERVAL '2 MINUTE')"),
      },
    };

    // exculde the requesting user from the list
    const excludeUser = {
      id: {
        [Op.ne]: id,
      },
    };

    return User.findAll({
      attributes: ["id", "username", "profilePic"],
      where: {
        [Op.and]: [
          cordinatesNotNullCheck,
          proximityCheck,
          userStatusCheck,
          excludeUser,
        ],
      },
    });
  }

  updateUserLocation(id, latitude, longitude) {
    return User.update({ latitude, longitude }, { where: { id } });
  }
}

module.exports = new LocationService();
