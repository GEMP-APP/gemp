// const request = require("supertest");
// const app = require("../server");

// describe("Get room list", () => {
//   describe("GET /rooms", () => {
//     test("Good request response with json, status(200)", (done) => {
//       request(app)
//         .get("/rooms")
//         .set("Accept", "application/json")
//         .expect("Content-type", /json/)
//         .then((response) => {
//           const { body, status } = response;
//           expect(status).toBe(200);
//           expect(body.firstName).toBe(user.firstName);
//           expect(body.lastName).toBe(user.lastName);
//           expect(body.email).toBe(user.email);
//           done();
//         })
//         .catch((err) => {
//           done(err);
//         });
//     });
//   });
// });
