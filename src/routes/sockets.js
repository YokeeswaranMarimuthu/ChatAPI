const chatService = require("../services/chat.services.js");
const socketIo = require('socket.io');
let io;
const users = {};
module.exports = {
  init: (server) => {
    io = socketIo(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });
    return io;
  },
  getIo: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
  createConnection :(io) => {
    io.on("connection", (socket) => {
      console.log("A user connected");
  
      socket.on("joinRoom", (room) => {
        socket.join(room);
        users[socket.id] = room;
        console.log(`User joined room: ${room}`);
      });
  
      // socket.on("message", ({ room, message }) => {
      //   console.log(`Received message: ${message} in room: ${room}`);
      //   chatService.addMessage(+room, message)
      //   socket.to(room).emit("message", message);
      // });
  
      socket.on("disconnect", () => {
        console.log("User disconnected");
        delete users[socket.id];
      });
    });
  }
};