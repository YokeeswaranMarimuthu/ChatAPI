const chatService = require("../services/chat.services.js");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    socket.on("message", ({ room, message }) => {
      console.log(`Received message: ${message} in room: ${room}`);
      chatService.addMessage(+room, message)
      socket.to(room).emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};