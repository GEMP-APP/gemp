const randomWords = require("./randomWords");
const users = [];
const rooms = [];

class Gemp {
  static userJoin(user) {
    const { room } = user;

    if (!rooms[room]) {
      rooms[room] = {
        users: [],
        category: "",
        maxScore: 120,
        capacity: 10,
        wordsUsed: [],
        currentWord: "",
        lastUserDraw: {},
        timeOut: undefined,
      };
    }

    rooms[room].users.push(user);
    users.push(user);
    return user;
  }

  static getCurrentUser(id) {
    return users.find((user) => user.id === id);
  }

  static formatMessage(username = "", message, type) {
    return {
      username,
      message,
      type,
    };
  }

  static userLeave(id) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const indexInRoom = rooms[users[index].room].users.findIndex(
        (user) => user.id === id
      );
      rooms[users[index].room].users.splice(indexInRoom, 1);
      return users.splice(index, 1)[0];
    }
  }

  static getUsersInRoom(room) {
    return users.filter((user) => user.room === room);
  }

  static start(room) {
    let totalUsers = rooms[room].users.length - 1;
    let lastUserDraw = rooms[room].lastUserDraw;
    let index;
    let nextUser;

    if (!lastUserDraw.id) {
      rooms[room].lastUserDraw = rooms[room].users[0];
      return {
        id: rooms[room].users[0].id,
        username: rooms[room].users[0].username,
      };
    }

    index = rooms[room].users.findIndex((user) => user.id === lastUserDraw.id);

    if (index >= totalUsers) {
      nextUser = rooms[room].users[0];
    } else {
      nextUser = rooms[room].users[index + 1];
    }

    rooms[room].lastUserDraw = nextUser;
    return {
      id: nextUser.id,
      username: nextUser.username
    };
  }

  static getTotalUsers(room) {
    return rooms[room].users.length;
  }

  static getWords(room) {
    let lastWords = rooms[room].wordsUsed;
    let unUsedWords = false;
    let nextWords;

    while (!unUsedWords) {
      nextWords = randomWords(2);
      if (
        !lastWords.filter(
          (word) => word === nextWords[0] || word === nextWords[1]
        )[0]
      ) {
        unUsedWords = true;
      }
    }
    return nextWords;
  }

  static setWord({ word, room }) {
    rooms[room].wordsUsed.push(word);
    rooms[room].currentWord = word;
  }

  static setTimeOut({ room, io }) {
    rooms[room].currentWord = setTimeout(() => {
      io.to(room).emit("timeout");
      const totalUsers = Gemp.getTotalUsers(room);
      
      if (totalUsers > 1) {
        let start = Gemp.start(room);
        io.to(room).emit("drawTurn", {
          id: start.id,
          username: user.username,
        });
      }
    }, 30000);
  }

  static validate({ word, room }) {
    return rooms[room].currentWord === word;
  }

  static addScore(user) {
    user.score += 10;
  }
}

module.exports = Gemp;
