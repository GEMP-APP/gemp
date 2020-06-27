const express = require("express");
const http = require("http");
const routes = require("./routes");
const socketIo = require("socket.io")

const app = express();
app.use(routes);

const server = http.createServer(app);
const io = socketIo(server);

const users = {};
let counter = 0;

io.on("connection", (socket) => {
  counter++;

  users[socket.id] = {
    id: socket.id,
    username: "",
    counter,
  };

  socket.emit("Connected", {
    id: socket.id,
    username: "User" + counter,
  });

  socket.on("userLogin", (payload) => {
    console.log(payload);
    users[socket.id].username = payload.username;
    socket.emit("loginSuccess", {
      id: socket.id,
      username: users[payload.id].username,
    });
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    console.log("user disconnected");
  });
  // console.log("User Online: ", Object.keys(users).length);
});

module.exports = {server, io};
