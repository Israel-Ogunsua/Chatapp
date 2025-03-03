"use strict";

const path = require("path"); // to get static path
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

// Import utilities
const formatMessage = require("./utils/messages");
const {
  joinUser,
  getCurrentUser,
  getUsersInRoom,
  leaveUser,
} = require("./utils/user");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const botName = "ChatCord Bot";

// Run when a client connects
io.on("connection", (socket) => {
  console.log("New WebSocket connection...");

  socket.on("joinRoom", ({ username, room }) => {
    const user = joinUser(socket.id, username, room);
    if (!user) return;

    socket.join(user.room);

    // Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to the chat room"));

    // Broadcast when a user joins
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${username} has joined the chat`)
      );

    // Send updated room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  // Listen for chat messages
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", formatMessage(user.username, msg));
    }
  });

  // Runs when a client disconnects
  socket.on("disconnect", () => {
    const user = leaveUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send updated room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
