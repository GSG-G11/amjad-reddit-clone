const request = require('supertest');
const buildDb = require('../../../database/config/build');
const app = require('../../../app');

beforeAll(buildDb);

describe.skip('GET /login', () => {
  it('should return 200 and content_type text/html', (done) => {
    request(app)
      .get('/login')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });
});

describe('POST /login', () => {
  // * valid credentials
  it('should return 200 and and application/json when credentials is valid', (done) => {
    request(app)
      .post('/login')
      .send({ email: 'amjad@gmail.com', password: '12345678' })
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, { body }) => {
        if (err) return done(err);

        expect(body.msg).toEqual('successfully logged in');
        return done();
      });
  });

  // * invalid credentials
  it('should return 404 and and application/json when credentials is invalid', (done) => {
    request(app)
      .post('/login')
      .send({ email: 'inValid@gmail.com', password: '12345678' })
      .expect(404)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, { body }) => {
        if (err) return done(err);

        expect(body.msg).toEqual('The email you entered isn’t connected to an account. please Create one');
        return done();
      });
  });

  // * valid credentials but wrong password
  it('should return 404 and and application/json when password is invalid', (done) => {
    request(app)
      .post('/login')
      .send({ email: 'amjad@gmail.com', password: 'wrongPass' })
      .expect(401)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .end((err, { body }) => {
        if (err) return done(err);

        expect(body.msg).toEqual('The password you’ve entered is incorrect');
        return done();
      });
  });
});
