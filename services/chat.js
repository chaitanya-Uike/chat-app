const { Message } = require("../models");
const redisService = require("./redis");
const { Op } = require("sequelize");

class ChatService {
  startChat(user1, user2) {
    return Message.findAll({
      where: {
        [Op.and]: [
          {
            senderId: {
              [Op.in]: [user1, user2],
            },
          },
          {
            recieverId: {
              [Op.in]: [user1, user2],
            },
          },
        ],
      },
    });
  }

  socketConnectionHandler(io) {
    return (socket) => {
      let userID;

      socket.on("identify", (id) => {
        userID = id;
        redisService.set(id, socket.id, 24 * 60 * 60 * 1000);
      });

      socket.on("send-message", (to, message) => {
        redisService.get(to).then((recieverSocketId) => {
          if (!recieverSocketId) return;

          io.to(recieverSocketId).emit("message", {
            message,
            senderId: userID,
          });
        });
      });

      socket.on("disconnect", () => {
        if (userID) redisService.delete(userID);
      });
    };
  }
}

module.exports = new ChatService();
