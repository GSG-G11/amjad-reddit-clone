const request = require('supertest');
const app = require('../../../app');
const buildDb = require('../../../database/config/build');
const connection = require('../../../database/config/connection');

afterAll(buildDb);
afterAll(() => connection.end());

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ3MzI5MzkzfQ._sfm_xlEprxwkl_e2Q19iBXWDa6RctfEH8zBcer62Yg; Path=/';

describe('post/post/:id', () => {
  it('should not create post when unAuthorized', (done) => {
    request(app)
      .post('/api/v1/post/1')
      .expect(401)
      .end((err, { body }) => {
        if (err) return done(err);

        expect(body.msg).toEqual('please Authenticate');
        return done();
      });
  });

  it('should  create post when Authorized', (done) => {
    request(app)
      .post('/api/v1/post/1')
      .set('Cookie', `token=${token}`)
      .send({
        date: '1/2/2002',
        content: 'good afternoon all!',
      })
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('GET/post', () => {
  it('should not get post when unAuthorized', (done) => {
    request(app)
      .get('/api/v1/post/1')
      .expect(401)
      .end((err, { body }) => {
        if (err) return done(err);

        expect(body.msg).toEqual('please Authenticate');
        return done();
      });
  });

  it('should get post when Authorized', (done) => {
    request(app)
      .get('/api/v1/post/1')
      .set('Cookie', `token=${token}`)
      .expect(200)
      .end((err, { body }) => {
        if (err) return done(err);

        expect(body[0]).toEqual({
          date: '2022-01-01T22:00:00.000Z',
          post_content: 'good morning everyone!',
          username: 'amjad',
        });
        return done();
      });
  });
});

describe('PATCH/post', () => {
  it('should not edit post when unAuthorized', (done) => {
    request(app)
      .patch('/api/v1/post/1')
      .expect(401)
      .end((err, { body }) => {
        if (err) return done(err);

        expect(body.msg).toEqual('please Authenticate');
        return done();
      });
  });

  it('should edit post when Authorized', (done) => {
    request(app)
      .patch('/api/v1/post/1')
      .set('Cookie', `token=${token}`)
      .send({ content: 'should be edited', postId: '1' })
      .expect(204)
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });
});

describe('DELETE/post', () => {
  it('should not delete post when unAuthorized', (done) => {
    request(app)
      .delete('/api/v1/post/1')
      .expect(401)
      .end((err, { body }) => {
        if (err) return done(err);

        expect(body.msg).toEqual('please Authenticate');
        return done();
      });
  });

  it('should delete post when Authorized', (done) => {
    request(app)
      .delete('/api/v1/post/1')
      .set('Cookie', `token=${token}`)
      .send({ postId: '2' })
      .expect(204)
      .end((err) => {
        if (err) return done(err);

        return done();
      });
  });
});

describe('GET/AllPosts', () => {
  it('should return all posts with json format', (done) => {
    request(app)
      .get('/api/v1/allPosts')
      .expect(200)
      .expect('content-type', 'application/json; charset=utf-8')
      .end((err, { body }) => {
        if (err) return done(err);

        expect(body).toHaveLength(1);
        return done();
      });
  });
});
