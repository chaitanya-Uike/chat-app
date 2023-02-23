const { User, sequelize } = require("../models");

class LocationService {
  getUsersInProximity(latitude, longitude) {
    return User.findAll({
      attributes: ["id", "username", "profilePic", "latitude", "longitude"],
      where: sequelize.fn(
        "ST_DWithin",
        sequelize.literal("ST_MakePoint(latitude, longitude)"),
        sequelize.literal(
          "ST_MakePoint(" + latitude + "," + longitude + ")::geography"
        ),
        1000
      ),
    });
  }
}

module.exports = new LocationService();