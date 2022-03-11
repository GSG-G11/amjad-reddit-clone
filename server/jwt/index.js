const { sign, verify } = require('jsonwebtoken');

const signToken = (payload, secret) => new Promise((resolve, reject) => {
  sign(payload, secret, (err, token) => {
    if (err) return reject(err);

    return resolve(token);
  });
});

const verifyToken = (token, secret) => new Promise((resolve, reject) => {
  verify(token, secret, (err, decoded) => {
    if (err) return reject(err);

    return resolve(decoded);
  });
});

module.exports = { signToken, verifyToken };
