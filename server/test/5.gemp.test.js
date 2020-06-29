const io = require("socket.io-client");
const Server = require("../server");
const PORT = process.env.PORT || 4001;

let ioServer;
let socket;
let socketB;
let httpServerAddr;
let server;

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
  Server.getServer.then((express) => {
    server = express;
    ioServer = Server.getIo();
    httpServerAddr = server.listen(PORT).address();
    done();
  });
});

/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
  ioServer.close();
  server.close();
  done();
});

/**
 * Run before each test
 */
beforeEach((done) => {
  // Setup
  // Do not hardcode server port and address, square brackets are used for IPv6
  socket = io.connect(
    `http://[${httpServerAddr.address}]:${httpServerAddr.port}`,
    {
      "reconnection delay": 0,
      "reopen delay": 0,
      "force new connection": true,
      transports: ["websocket"],
    }
  );
  socketB = io.connect(
    `http://[${httpServerAddr.address}]:${httpServerAddr.port}`,
    {
      "reconnection delay": 0,
      "reopen delay": 0,
      "force new connection": true,
      transports: ["websocket"],
    }
  );

  socket.on("connect", () => {
    socketB.on("connect", () => {
      done();
    });
  });
});

/**
 * Run after each test
 */
afterEach((done) => {
  // Cleanup
  if (socket.connected) {
    socket.disconnect();
  }

  if (socketB.connected) {
    socketB.disconnect();
  }

  done();
});

describe("basic socket.io example", () => {
  test("Join room", (done) => {
    const data = {
      username: "User123",
      room: "room123",
    };

    // Client send emit
    socket.emit("joinRoom", data);

    setTimeout(() => {
      // Get response from server
      socket.on("newMessage", (payload) => {
        expect(payload.username).toBe(data.username);
        expect(payload.type).toBe("bot");
      });
      done();
    }, 500);
  });

  test("Game play should start", (done) => {
    // room master
    const dataUser1 = {
      username: "User1",
      room: "room123",
    };

    // other user
    const dataUser2 = {
      username: "User2",
      room: "room123",
    };

    socket.on("roomUsers", (payload) => {
      if (payload.users.length >= 2) {
        // room master send start command
        socket.emit("gameStart");
      }
    });

    socket.on("drawTurn", (payload) => {
      expect(payload).toHaveProperty("id");
      expect(payload).toHaveProperty("username");
    });

    socket.on("newMessage", (payload) => {
      expect(payload).toHaveProperty("username");
      expect(payload).toHaveProperty("message");
      expect(payload).toHaveProperty("type");
    });

    socketB.on("newMessage", (payload) => {
      expect(payload).toHaveProperty("username");
      expect(payload).toHaveProperty("message");
      expect(payload).toHaveProperty("type");
    });

    socket.emit("joinRoom", dataUser1);
    socketB.emit("joinRoom", dataUser2);

    setTimeout(() => {
      socket.emit("sendMessage", { message: "it is a chat message" });
      socket.emit("getWords");
      socket.emit("setWord", "answer");
      socket.emit("checkAnswer", "answer");
    }, 1000);

    setTimeout(() => {
      done();
    }, 4500);
  });
});
