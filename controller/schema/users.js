const proximitySchema = {
  response: {
    200: {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
        users: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              username: {
                type: "string",
              },
              profilePic: {
                type: "string",
              },
              distance: {
                type: "number",
              },
            },
          },
        },
      },
    },
  },
};

const profileSchema = {
  params: {
    type: "object",
    properties: {
      id: {
        type: "integer",
      },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
        profile: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            username: {
              type: "string",
            },
            profilePic: {
              type: "string",
            },
          },
        },
      },
    },
  },
};

const heartbeatSchema = {
  body: {
    type: "object",
    properties: {
      latitude: {
        type: "number",
      },
      longitude: {
        type: "number",
      },
    },
    required: ["latitude", "longitude"],
  },
};

module.exports = { proximitySchema, profileSchema, heartbeatSchema };
