const randomWords = require("./randomWords");
const animalWords = require("./animalWords");
const fruitWords = require("./fruitWords");
const users = [
  {
    id: "socket.id",
    username: "sudo",
    room: "animal",
    score: 0,
    category: "animal",
  },
  {
    id: "socket.id2",
    username: "sudo2",
    room: "animal",
    score: 0,
    category: "animal",
  },
];
const rooms = {
  animal: {
    mook: true,
    _id: "animal",
    wordsUsed: [],
    category: "animal",
    timeOut: undefined,
    lastUserDraw: {
      id: "socket.id",
      username: "sudo",
      room: "animal",
      score: 0,
      category: "animal",
    },
    users: [
      {
        id: "socket.id",
        username: "sudo",
        room: "animal",
        score: 0,
        category: "animal",
      },
      {
        id: "socket.id2",
        username: "sudo2",
        room: "animal",
        score: 0,
        category: "animal",
      },
    ],
  },
  fruit: {
    mook: true,
    _id: "fruit",
    wordsUsed: [],
    category: "fruit",
    users: []
  },
};

class Gemp {
  static roomInit(room) {
    const { name, category, poster_path, language, capacity, maxScore } = room;
    rooms[room._id] = {
      mook: false,
      _id: room._id,
      name,
      users: [],
      category,
      poster_path,
      maxScore,
      capacity,
      language,
      wordsUsed: [],
      currentWord: "",
      lastUserDraw: {},
      timeOut: undefined,
    };
  }

  static getRooms() {
    const roomList = Object.keys(rooms).map(key => {
      const { _id, name, category, capacity, maxScore, poster_path, language, users, mook} = rooms[key]
        return {
          _id,
          name,
          category,
          users: users.length,
          capacity,
          maxScore,
          poster_path,
          language,
          mook,
        }
    });

    return roomList.filter(room => room.mook !== true)
  }

  static userJoin(user) {
    const { room } = user;

    if (!rooms[room]) {
      rooms[room] = {
        users: [],
        category: user.category,
        maxScore: 30,
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

      if (rooms[users[index].room].users.length === 0) {
        delete rooms[users[index].room];
      }

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

    console.log(lastUserDraw.id);
    if (!lastUserDraw.id) {
      rooms[room].lastUserDraw = rooms[room].users[0];
      return {
        id: rooms[room].users[0].id,
        username: rooms[room].users[0].username,
      };
    }

    index = rooms[room].users.findIndex((user) => user.id === lastUserDraw.id);

    if (index >= totalUsers) {
      console.log("reset giiran");
      nextUser = rooms[room].users[0];
    } else {
      console.log("lanjut giliran");
      nextUser = rooms[room].users[index + 1];
    }

    rooms[room].lastUserDraw = nextUser;
    return {
      id: nextUser.id,
      username: nextUser.username,
    };
  }

  static resetGame(room) {
    rooms[room].users.forEach((user) => {
      user.score = 0;
      user.hitAnswer = false;
    });
    return true;
  }

  static stopGame(room, io) {
    clearTimeout(rooms[room].timeOut);
    Gemp.resetGame(room);
    io.to(room).emit("roomUsers", {
      room,
      users: Gemp.getUsersInRoom(room),
    });
  }

  static getTotalUsers(room) {
    return rooms[room].users.length;
  }

  static getWords(room) {
    let lastWords = rooms[room].wordsUsed;
    let unUsedWords = false;
    let nextWords;
    let isUnique;

    while (!unUsedWords) {
      switch (rooms[room].category) {
        case "fruit":
          nextWords = fruitWords(2);
          break;
        case "animal":
          nextWords = animalWords(2);
          break;
        default:
          nextWords = randomWords(2);
          break;
      }
      nextWords = nextWords.map((word) => word.toLowerCase());
      isUnique = lastWords.filter(
        (word) => word === nextWords[0] || word === nextWords[1]
      )[0];
      !isUnique && (unUsedWords = true);
    }
    return nextWords;
  }

  static setWord({ word, room }) {
    rooms[room].wordsUsed.push(word);
    rooms[room].currentWord = word;
    rooms[room].users.forEach((user) => {
      user.hitAnswer = false;
    });
  }

  static setTimeOut({ room, io }) {
    rooms[room].timeOut = setTimeout(() => {
      const totalUsers = Gemp.getTotalUsers(room),
        maxScore = rooms[room].maxScore,
        users = [...rooms[room].users];
      users.sort((a, b) => b.score - a.score);
      io.to(room).emit("timeout");
      users[0].score >= maxScore &&
        io.to(room).emit("gameFinish", { users }) &&
        Gemp.resetGame(room);
      totalUsers > 1
        ? io.to(room).emit("drawTurn", Gemp.start(room))
        : Gemp.stopGame(room, io);
    }, 7000);
  }

  static validate({ word, room }) {
    return rooms[room].currentWord === word;
  }

  static addScore(user) {
    !user.hitAnswer && (user.score += 10) && (user.hitAnswer = true) && (rooms[user.room].lastUserDraw.score += 5);
  }
}

module.exports = Gemp;
