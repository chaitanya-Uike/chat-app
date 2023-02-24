const { User } = require("../models");
const locationService = require("./location");
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

  updateLocationData({ id, latitude, longitude }) {
    return User.update({ latitude, longitude }, { where: { id } });
  }
}

module.exports = new UserService();
