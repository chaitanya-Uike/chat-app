const fastify = require("fastify")({ logger: true });
const db = require("./models");

const env = process.env.NODE_ENV || "development";
if (env === "development") require("dotenv").config();

fastify.register(require("@fastify/auth"));
fastify.decorate("verifyJWT", require("./plugins/authorization"));
fastify.register(require("./routes/auth"), { prefix: "/auth" });

async function start() {
  const port = process.env.PORT || 5000;
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
