const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const { connect } = require("./configs/mongo");
const app = express();

let server;
let io;

const users = {};
let counter = 0;

const getServer = new Promise((resolve, reject) => {
  connect((err) => {
    if (!err) {
      app.use(cors())
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
      app.use("/", require("./routes"));
      server = http.createServer(app);
      io = socketIo(server);

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

        socket.on("sendMessage", (payload) => {
          socket.broadcast.emit("newMessage", payload)
        })

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
      resolve(server);
    }
  });
});

const getIo = () => io;

module.exports = {getServer: getServer, getIo};
