const io = require("socket.io-client");
const Server = require("../server");
const PORT = process.env.PORT || 4000;

let ioServer;
let socket;
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
  socket.on("connect", () => {
    done();
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
  done();
});

describe("basic socket.io example", () => {
  test("should communicate", (done) => {
    // once connected, emit Hello World
    ioServer.emit("echo", "Hello World");
    socket.once("echo", (message) => {
      // Check that the message matches
      expect(message).toBe("Hello World");
      done();
    });
    ioServer.on("connection", (mySocket) => {
      expect(mySocket).toBeDefined();
    });
  });

  test("should get response after login (first time click play button)", (done) => {
    const user = {
      username: "User123",
      id: socket.id,
    };
    // Client send emit
    socket.emit("userLogin", user);

    setTimeout(() => {
      // Get response from server
      socket.on("loginSuccess", (payload) => {
        expect(payload.id).toBe(user.id);
        expect(payload.username).toBe(user.username);
      });
      done();
    }, 500);
  });

  test("should get response after first time connect", (done) => {
    // Setiap test akan buat koneksi baru, jadi tunggu dulu response dari server
    setTimeout(() => {
      socket.on("Connected", (payload) => {
        expect(payload.id).toBe(socket.id);
      });
      done();
    }, 500);
  });
});
