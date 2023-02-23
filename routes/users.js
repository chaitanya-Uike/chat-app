const {
  proximitySchema,
  profileSchema,
  heartbeatSchema,
} = require("../controller/schema/users");

const {
  proximity,
  profile,
  heartbeat,
} = require("../controller/handlers/users");

function usersRoute(fastify, options, done) {
  fastify.get("/proximity", {
    schema: proximitySchema,
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: proximity,
  });
  fastify.get("/profile/:id", {
    schema: profileSchema,
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: profile,
  });
  fastify.patch("/heartbeat", {
    schema: heartbeatSchema,
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: heartbeat,
  });
  done();
}

module.exports = usersRoute;
