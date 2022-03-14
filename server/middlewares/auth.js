const { verifyToken } = require('../jwt');

const auth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return next();

  const { JWT_SECRET } = process.env;

  verifyToken(token, JWT_SECRET)
    .then(({ id }) => {
      req.id = id;
      return next();
    })
    .catch(next);
};

module.exports = auth;
