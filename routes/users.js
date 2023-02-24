const {
  proximitySchema,
  profileSchema,
  pingSchema,
} = require("../controller/schema/users");

const { proximity, profile, ping } = require("../controller/handlers/users");

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
  fastify.patch("/ping", {
    schema: pingSchema,
    preHandler: fastify.auth([fastify.verifyJWT]),
    handler: ping,
  });
  done();
}

module.exports = usersRoute;
