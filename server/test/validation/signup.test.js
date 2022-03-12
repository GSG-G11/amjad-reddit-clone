const req = require('supertest');
const app = require('../../app');

const dummyUser = require('./fixtures');

describe('GET/signup', () => {
  // GET /signup
  it('should respond with 200 and text/html when successful', (done) => {
    req(app)
      .get('/api/v1/signup')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end((err, res) => {
        if (err) return done(err);

        expect(res.ok).toBeTruthy();
        return done();
      });
  });

  // POST /signup
  it('should respond with 201 and text/plain when successful', (done) => {
    req(app)
      .post('/api/v1/signup')
      .expect(201)
      .send(dummyUser)
      .expect('content-type', 'application/json; charset=utf-8')
      .end((err, { body }) => {
        if (err) return done(err);

        const expectedMsg = 'account created successfully';

        expect(body.msg).toEqual(expectedMsg);
        return done();
      });
  });
});
