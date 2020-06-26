const request = require('supertest')
const app = require('../app')

describe('Home page', () => {
  const user = {
    firstName: 'User',
    lastName: 'Pertama',
    email: 'demo@demo.io',
    password: 'usedemo'
  }

  describe('GET /', () => {
    test('Good request response with json, status(200)', (done) => {
      request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .then(response => {
        const {body, status} = response
        expect(status).toBe(200)
        expect(body.status).toBe("ok")
        done()
      })
      .catch(err => {
        done(err)
      })
    })
  })
})
