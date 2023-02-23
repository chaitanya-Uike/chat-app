const { User } = require("../models");
const locationService = require("./locationService");
const { NotFoundError } = require("../lib/serverErrors");

class UserService {
  async getUser(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) throw new NotFoundError("User not found");

    return user;
  }

  async getProfile(id) {
    const user = await this.getUser(id);
    const { username, profilePic } = user;
    return { id, username, profilePic };
  }

  async getUsersInProximity(id) {
    const user = await this.getUser(id);

    const { latitude, longitude } = user;

    return locationService.getUsersInProximity(id, latitude, longitude);
  }

  processHeartbeat({ id, latitude, longitude }) {
    return locationService.updateUserLocation(id, latitude, longitude);
  }
}

module.exports = new UserService();
