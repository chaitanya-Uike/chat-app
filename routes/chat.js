const { startChatSchema } = require("../controller/schema/chat");
const { startChat } = require("../controller/handlers/chat");

function chatRoute(fastify, options, done) {
  fastify.get("/", {
    schema: startChatSchema,
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: startChat,
  });

  done();
}

module.exports = chatRoute;
