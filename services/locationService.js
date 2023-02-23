const { User, sequelize } = require("../models");
const { Op } = require("sequelize");

class LocationService {
  getUsersInProximity(latitude, longitude) {
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
    // only get users who were updated in the last 2 mins
    const userStatusCheck = {
      updatedAt: {
        [Op.lte]: sequelize.literal("NOW() - (INTERVAL '2 MINUTE')"),
      },
    };

    return User.findAll({
      attributes: ["id", "username", "profilePic"],
      where: {
        [Op.and]: [cordinatesNotNullCheck, proximityCheck, userStatusCheck],
      },
    });
  }

  updateUserLocation(id, latitude, longitude) {
    return User.update({ latitude, longitude }, { where: { id } });
  }
}

module.exports = new LocationService();
