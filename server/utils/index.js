const { customError } = require('../controllers/errors');

const checkAuth = (tokenId, userId) => {
  Number(tokenId) !== Number(userId) && customError({ status: 401, msg: 'please Authenticate' });
};

const destructure = (req) => {
  const {
    id: tokenId,
    body: { content, postId, date },
    params: { id: userId },
  } = req;

  return {
    tokenId,
    content,
    userId,
    postId,
    date,
  };
};

module.exports = { checkAuth, destructure };
