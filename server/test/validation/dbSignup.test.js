const buildDb = require('../../database/config/build');
const connection = require('../../database/config/connection');
const { validDbCredentials } = require('./fixtures');
const { checkUser, createUser } = require('../../database/queries');

afterAll(buildDb);

const { email } = validDbCredentials;

describe('CreateUser Query', () => {
  // * valid credentials
  it('should create user when valid credentials are provided', () => {
    createUser(validDbCredentials).then(({ rows }) => {
      expect(rows[0]).toHaveProperty('id');
    })
      .then(() => {
        checkUser(email).then(({ rowCount }) => {
          expect(rowCount).toEqual(1);
        });
      });
  });

  // * invalid credentials
  it('should not create user when invalid credentials are provided', () => {
    createUser({}).then(({ rowCount }) => {
      expect(rowCount).toBe(0);
    });
  });
});

describe('CheckUser Query', () => {
  // * invalid email
  it('should return email when email already exists', () => {
    checkUser(email).then(({ rows }) => {
      expect(rows[0]).toEqual({ email });
    });
  });

  // * valid email
  it('should return empty rows array when email is valid', () => {
    checkUser('amjad2@gmail.com').then(({ rowCount }) => {
      expect(rowCount).toEqual(0);
    });
  });
});

afterAll(() => connection.end());
