"use strict";
const request = require("supertest");
const { server: app } = require("../server");

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
