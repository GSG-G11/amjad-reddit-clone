const buildDb = require('../../../database/config/build');
const connection = require('../../../database/config/connection');
const { validDbCredentials } = require('../fixtures');
const { checkUser, createUser } = require('../../../database/queries');

afterAll(buildDb);
afterAll(() => connection.end());

describe('CreateUser Query', () => {
  // * valid credentials
  it('should create user when valid credentials are provided', () => {
    createUser(validDbCredentials).then(({ rows, rowCount }) => {
      expect(rowCount).toBe(1);
      expect(rows[0]).toHaveProperty('id');
    });
  });
});

describe('CheckUser Query', () => {
  // * email exists
  it('should return the queried email exists in db', () => {
    checkUser('amjad@gmail.com').then(({ rows, rowCount }) => {
      const expected = rows[0].email;

      expect(expected).toEqual('amjad@gmail.com');
      expect(rowCount).toEqual(1);
    });
  });

  // * email not exist
  it('should return empty rows array when email not exist in db', () => {
    checkUser('notExist@gmail.com').then(({ rowCount }) => {
      expect(rowCount).toEqual(0);
    });
  });
});
