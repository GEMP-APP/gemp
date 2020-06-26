const request = require('supertest')
const app = require('../app')

describe('Special route for login and register', () => {
  describe('POST /register', () => {
    test('Good request response with json, status(201)', (done) => {
      request(app)
      .post('/register')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(201)
        expect(body.id).toBeTruthy()
        expect(body.firstName).toBe(user.firstName)
        expect(body.lastName).toBe(user.lastName)
        expect(body.email).toBe(user.email)
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })
})
