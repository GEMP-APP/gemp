const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const { connect } = require("./configs/mongo");
const Gemp = require("./gemp");
const app = express();

let server;
let io;
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
          const { username, room, category } = payload;
          const user = Gemp.userJoin({
            id: socket.id,
            username,
            room,
            score: 0,
            category,
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

          io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: Gemp.getUsersInRoom(user.room),
          });

          socket.broadcast
            .to(user.room)
            .emit(
              "newMessage",
              Gemp.formatMessage(undefined, `${user.username} has join.`, "bot")
            );
        });

        socket.on("sendMessage", (payload) => {
          const user = Gemp.getCurrentUser(socket.id);
          if (user) {
            socket.broadcast
              .to(user.room)
              .emit(
                "newMessage",
                Gemp.formatMessage(user.username, payload.message, "chat")
              );
          }
        });

        socket.on("gameStart", () => {
          const user = Gemp.getCurrentUser(socket.id);
          const totalUsers = Gemp.getTotalUsers(user.room);

          if (totalUsers > 1) {
            io.to(user.room).emit("drawTurn", Gemp.start(user.room));
          }
        });

        socket.on("getWords", () => {
          const user = Gemp.getCurrentUser(socket.id);
          const words = Gemp.getWords(user.room);
          console.log(words);
          socket.emit("getWords", words);
        });

        socket.on("setWord", (word) => {
          console.log(word);
          const user = Gemp.getCurrentUser(socket.id);
          Gemp.setWord({ word, room: user.room });
          io.to(user.room).emit("startDraw");
          Gemp.setTimeOut({ room: user.room, io });
        });

        socket.on("checkAnswer", (word) => {
          const user = Gemp.getCurrentUser(socket.id);
          const valid = Gemp.validate({ word, room: user.room });
          console.log({ word, valid });

          if (valid && !user.hitAnswer) {
            Gemp.addScore(user);
            console.log(user);

            socket.emit(
              "youHit",
              Gemp.formatMessage("You", `hit! The answer is ${word}.`, "hit")
            );

            socket.broadcast
              .to(user.room)
              .emit(
                "userHit",
                Gemp.formatMessage(user.username, "hit!", "hit")
              );

            io.to(user.room).emit("roomUsers", {
              room: user.room,
              users: Gemp.getUsersInRoom(user.room),
            });
          }
        });

        socket.on("canvasDraw", (payload) => {
          console.log("canvasDraw: ", payload);
          const user = Gemp.getCurrentUser(socket.id);
          socket.broadcast.to(user.room).emit("canvasDraw", payload);
        });

        socket.on("donePath", (payload) => {
          console.log("donePath: ", JSON.stringify(payload));
          const user = Gemp.getCurrentUser(socket.id);
          socket.broadcast.to(user.room).emit("receiveDonePath", payload);
        });

        socket.on("disconnect", () => {
          console.log("user dc");
          const user = Gemp.userLeave(socket.id, io);

          if (user) {
            io.to(user.room).emit(
              "newMessage",
              Gemp.formatMessage(undefined, `${user.username} has left.`, "bot")
            );

            io.to(user.room).emit("roomUsers", {
              room: user.room,
              users: Gemp.getUsersInRoom(user.room),
            });
          }
        });
      });
      resolve(server);
    }
  });
});

const getIo = () => io;

module.exports = { getServer, getIo };
