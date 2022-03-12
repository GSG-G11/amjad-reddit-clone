const req = require('supertest');
const app = require('../../app');

describe('GET/signup', () => {
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
