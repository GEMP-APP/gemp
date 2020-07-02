"use strict";
const request = require("supertest");
const Server = require("../server");
const { getClient } = require("../configs/mongo");

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

describe("Room resources", () => {
  describe("#GET /rooms", () => {
    it("Should response, status(200)", (done) => {
      request(app)
        .get("/rooms")
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

  describe("#GET /rooms by ID", () => {
    let id = "5ef75532986ea6193a0f4522";
    it("Should response, status(200)", (done) => {
      request(app)
        .get("/rooms/" + id)
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

  describe("#POST /rooms create new Room", () => {
    let newRoom = {
      name: "General #",
      category: "general",
      poster_path: "https://via.placeholder.com/50",
      language: "en",
      capacity: 10,
      maxScore: 40,
      currentScore: 0,
    };
    it("Should response, status(201)", (done) => {
      request(app)
        .post("/rooms")
        .set("Accept", "application/json")
        .send(newRoom)
        .expect("Content-type", /json/)
        .then((response) => {
          const { status } = response;
          expect(status).toBe(201);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("#POST /rooms create new Room but data not valid", () => {
    let newRoom = {
      name: "Rocket Dalam Angan Eps. 5",
      category:
        "Yet another documentary movie about junie developer join bootcapm program",
      poster_path: "https://via.placeholder.com/50",
    };
    it("Should response, status(500)", (done) => {
      request(app)
        .post("/rooms")
        .set("Accept", "application/json")
        .send(newRoom)
        .expect("Content-type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(500);
          expect(body).toHaveProperty("err", "SERVER_ERROR");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("#PUT /rooms by ID", () => {
    let id = "5ef75532986ea6193a0f4522";
    let newRoom = {
      name: "General #",
      category: "general",
      poster_path: "https://via.placeholder.com/50",
      language: "en",
      capacity: 10,
      maxScore: 40,
      currentScore: 0,
    };
    it("Should response, status(200)", (done) => {
      request(app)
        .put("/rooms/" + id)
        .set("Accept", "application/json")
        .send(newRoom)
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

  describe("#DELETE /rooms by ID", () => {
    let id;
    let newRoom = {
      name: "General #",
      category: "general",
      poster_path: "https://via.placeholder.com/50",
      language: "en",
      capacity: 10,
      maxScore: 40,
      currentScore: 0,
    };
    it("Should response, status(200)", (done) => {
      request(app)
        .post("/rooms")
        .set("Accept", "application/json")
        .send(newRoom)
        .expect("Content-type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(201);
          id = body._id;
          return request(app)
            .delete("/rooms/" + id)
            .set("Accept", "application/json")
            .expect("Content-type", /json/);
        })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty("n", 1);
          expect(body).toHaveProperty("ok", 1);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("#DELETE /rooms by ID but not valid format", () => {
    let id = "5ef75532986ea6193a0f";
    it("Should response, status(500)", (done) => {
      request(app)
        .delete("/rooms/" + id)
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(500);
          expect(body).toHaveProperty("err", "SERVER_ERROR");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
  describe("#DELETE /rooms by ID but not valid format", () => {
    let id = "5ef75532986ea6193a0f";
    it("Should response, status(500)", (done) => {
      request(app)
        .delete("/rooms/" + id)
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(500);
          expect(body).toHaveProperty("err", "SERVER_ERROR");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("#GET /rooms by ID but not valid format", () => {
    let id = "5ef75532986ea6193a0f";
    it("Should response, status(500)", (done) => {
      request(app)
        .get("/rooms/" + id)
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(500);
          expect(body).toHaveProperty("err", "SERVER_ERROR");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
  
  describe("#PUT /rooms by ID but not valid format", () => {
    let id = "5ef75532986ea6193a0f";
    it("Should response, status(500)", (done) => {
      request(app)
        .put("/rooms/" + id)
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(500);
          expect(body).toHaveProperty("err", "SERVER_ERROR");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("#GET /rooms but database is down", () => {
    it("Should response, status(500)", (done) => {
      getClient().close()
      request(app)
        .get("/rooms")
        .set("Accept", "application/json")
        .expect("Content-type", /json/)
        .then((response) => {
          const { status } = response;
          expect(status).toBe(500);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
