const fastify = require("fastify")({ logger: true });
const db = require("./models");
const path = require("path");

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
});

fastify.register(require("@fastify/auth"));
fastify.decorate("verifyJWT", require("./plugins/authorization"));
fastify.register(require("./routes/auth"), { prefix: "/auth" });

async function start() {
  const port = process.env.PORT || 5000;
  const address = await fastify.listen({ port, host: "0.0.0.0" });
  console.log("[server]💫 ready at", address);
}

db.sequelize
  .sync({ alter: true })
  .then(() => {
    start();
  })
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
