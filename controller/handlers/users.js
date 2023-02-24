const userService = require("../../services/user");
const HTTPStatus = require("../../lib/HTTPStatus");

async function proximity(request, reply) {
  const { id } = request.user;
  const users = await userService.getUsersInProximity(id);
  reply
    .status(HTTPStatus.OK.code)
    .send({ users, messsage: HTTPStatus.OK.message });
}

async function profile(request, reply) {
  const { id } = request.params;
  const profile = await userService.getProfile(id);
  reply
    .status(HTTPStatus.OK.code)
    .send({ profile, messsage: HTTPStatus.OK.message });
}

async function ping(request, reply) {
  const { id } = request.user;
  await userService.updateLocationData({ ...request.body, id });
  reply.status(HTTPStatus.OK.code);
}

module.exports = { proximity, profile, ping };
