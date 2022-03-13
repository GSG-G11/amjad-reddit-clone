const buildDb = require('../../database/config/build');
const connection = require('../../database/config/connection');

const { checkUser } = require('../../database/queries');

beforeAll(buildDb);

it('should return email of amjad@gmail.com', () => {
  checkUser('amjad@gmail.com').then(({ rows }) => {
    expect(rows[0]).toEqual({ email: 'amjad@gmail.com' });
  });
});

it('should return empty rows array when email is not found', () => {
  checkUser('amjad@gmail.com').then(({ rowCount }) => {
    expect(rowCount).toEqual(0);
  });
});

afterAll(() => connection.end());
