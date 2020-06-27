"use strict";
const request = require("supertest");
const Server = require("../server");

let app;
let ioServer;

beforeAll((done) => {
  Server.getServer
    .then((express) => {
      app = express;
      ioServer = Server.getIo();
      done();
    })
    .catch((err) => console.log(err));
});

afterAll((done) => {
  ioServer.close();
  app.close();
  done();
});

describe("Home page", () => {
  const user = {
    firstName: "User",
    lastName: "Pertama",
    email: "demo@demo.io",
    password: "usedemo",
  };

  describe("#GET /", () => {
    it("Should response, status(200)", (done) => {
      request(app)
        .get("/")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .then((response) => {
          const { status } = response;
          expect(status).toBe(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
