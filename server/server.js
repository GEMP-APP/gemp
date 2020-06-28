const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const { connect } = require("./configs/mongo");
const Gemp = require("./gemp");
const app = express();

let server;
let io;

const users = {};
let counter = 0;

const getServer = new Promise((resolve, reject) => {
  connect((err) => {
    if (!err) {
      app.use(cors());
      app.use(express.json());
      app.use(express.urlencoded({ extended: false }));
      app.use("/", require("./routes"));
      server = http.createServer(app);
      io = socketIo(server);

      io.on("connection", (socket) => {
        counter++;

        socket.emit("Connected", {
          id: socket.id,
          username: "User" + counter,
        });

        socket.on("joinRoom", (payload) => {
          const { username, room } = payload;
          const user = Gemp.userJoin({
            id: socket.id,
            username,
            room,
          });

          socket.join(user.room);

          socket.emit(
            "newMessage",
            Gemp.formatMessage(
              undefined,
              `Welcome ${user.username}, Have fun!`,
              "bot"
            )
          );

          socket.broadcast
            .to(user.room)
            .emit(
              "newMessage",
              Gemp.formatMessage(undefined, `${user.username} has join.`, "bot")
            );
        });

        socket.on("sendMessage", (payload) => {
          const user = Gemp.getCurrentUser(socket.id);

          socket.broadcast
            .to(user.room)
            .emit(
              "newMessage",
              Gemp.formatMessage(user.username, payload.message, "chat")
            );
        });

        socket.on("disconnect", () => {
          const user = Gemp.userLeave(socket.id);

          if (user) {
            socket.broadcast
              .to(user.room)
              .emit(
                "newMassage",
                Gemp.formatMessage(undefined, `${user.username} has left.`)
              );
          }
        });
        // console.log("User Online: ", Object.keys(users).length);
      });
      resolve(server);
    }
  });
});

const getIo = () => io;

module.exports = { getServer: getServer, getIo };
