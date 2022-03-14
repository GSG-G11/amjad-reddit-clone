const {
  getPostQuery,
  createPostQuery,
  getAllPostsQuery,
  editPostQuery,
  deletePostQuery,
} = require('../../database/queries/api/post');
const { destructure, checkAuth } = require('../../utils');

const getAllPosts = (req, res, next) =>
  getAllPostsQuery()
    .then(({ rows }) => res.json(rows))
    .catch(next);

const getPost = (req, res, next) => {
  const { tokenId, userId } = destructure(req);

  checkAuth(tokenId, userId);

  return getPostQuery(userId)
    .then(({ rows }) => res.json(rows))
    .catch(next);
};

const createPost = (req, res, next) => {
  const { tokenId, userId, content, date } = destructure(req);

  checkAuth(tokenId, userId);

  return createPostQuery({ content, date, userId })
    .then(() => res.end())
    .catch(next);
};

const editPost = (req, res, next) => {
  const { tokenId, userId, postId, content } = destructure(req);

  checkAuth(tokenId, userId);

  return editPostQuery({ content, postId, userId })
    .then(() => res.end())
    .catch(next);
};

const deletePost = (req, res, next) => {
  const { tokenId, userId, postId } = destructure(req);

  checkAuth(tokenId, userId);

  deletePostQuery({ userId, postId })
    .then(() => res.end())
    .catch(next);
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
};
