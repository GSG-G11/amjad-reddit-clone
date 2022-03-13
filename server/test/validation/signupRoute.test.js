const req = require('supertest');
const app = require('../../app');
const buildDb = require('../../database/config/build');
const { validCredentials, inValidCredentials } = require('./fixtures');

beforeAll(buildDb);

describe.skip('GET/signup', () => {
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
});

// * POST/signup
describe('POST/signup', () => {
  // POST /signup when valid credentials
  it('should respond with 201 and application/json when valid credentials are provided', (done) => {
    req(app)
      .post('/api/v1/signup')
      .send(validCredentials)
      .expect(201)
      .expect('content-type', 'application/json; charset=utf-8')
      .end((err, { body }) => {
        if (err) return done(err);

        const receivedMsg = body.msg;
        const expectedMsg = 'account created successfully';

        expect(receivedMsg).toEqual(expectedMsg);
        return done();
      });
  });

  // POST /signup when existing credentials
  it('should respond with 201 and application/json when existing credentials are provided', (done) => {
    req(app)
      .post('/api/v1/signup')
      .send(validCredentials)
      .expect(409)
      .expect('content-type', 'application/json; charset=utf-8')
      .end((err, { body }) => {
        if (err) return done(err);

        const receivedMsg = body.msg;
        const expectedMsg = 'email already in use, try using a different one';

        expect(receivedMsg).toEqual(expectedMsg);
        return done();
      });
  });

  // POST /signup when invalid credentials
  it('should respond with 400 and application/json when invalid credentials are provided', (done) => {
    req(app)
      .post('/api/v1/signup')
      .send(inValidCredentials)
      .expect(400)
      .expect('content-type', 'application/json; charset=utf-8')
      .end((err, { body }) => {
        if (err) return done(err);

        const receivedMsg = body.msg;
        const expectedMsg = 'bad request';

        expect(receivedMsg).toEqual(expectedMsg);
        return done();
      });
  });
});
