const fastify = require("fastify")({ logger: true });
const db = require("./models");
const path = require("path");
const chatService = require("./services/chat");

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
});

fastify.register(require("@fastify/cors"), {
  origin: true,
});

fastify.register(require("fastify-socket.io"));

fastify.register(require("@fastify/auth"));
fastify.decorate("verifyJWT", require("./plugins/authorization"));
fastify.register(require("./routes/auth"), { prefix: "/auth" });
fastify.register(require("./routes/users"), { prefix: "/users" });
fastify.register(require("./routes/chat"), { prefix: "/chat" });

async function start() {
  const port = process.env.PORT || 5050;
  const address = await fastify.listen({ port, host: "0.0.0.0" });
  console.log("[server]💫 ready at", address);
}

db.sequelize
  .sync({ force: true })
  .then(() => {
    start();
  })
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });

fastify.ready().then(() => {
  fastify.io.on("connection", chatService.socketConnectionHandler(fastify.io));
});
