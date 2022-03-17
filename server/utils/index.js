const { customError } = require('../controllers/errors');

const checkAuth = (tokenId, userId) => {
  Number(tokenId) !== Number(userId) && customError({ status: 401, msg: 'please Authenticate' });
};

const destructure = (req) => {
  const {
    id: tokenId,
    body: { content, postId, date, img },
    params: { id: userId },
  } = req;

  return {
    tokenId,
    content,
    userId,
    postId,
    date,
    img,
  };
};

module.exports = { checkAuth, destructure };
