const startChatSchema = {
  query: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
    },
    required: ["id"],
  },
  response: {
    200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          text: {
            type: "string",
          },
          senderId: {
            type: "string",
          },
          recieverId: {
            type: "string",
          },
          createdAt: {
            type: "string",
          },
        },
      },
    },
  },
};

module.exports = { startChatSchema };
