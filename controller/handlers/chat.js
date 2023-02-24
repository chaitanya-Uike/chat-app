const chatService = require("../../services/chat");
const HTTPStatus = require("../../lib/HTTPStatus");

async function startChat(request, reply) {
  const { id: user1 } = request.user;
  const { id: user2 } = request.query;

  const messages = await chatService.startChat(user1, user2);
  reply.status(HTTPStatus.OK.code).send(messages);
}

module.exports = { startChat };
