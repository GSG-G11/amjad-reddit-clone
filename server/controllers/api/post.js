const {
  getPostQuery,
  createPostQuery,
  getAllPostsQuery,
  editPostQuery,
  deletePostQuery,
} = require('../../database/queries/api/post');
const { destructure, checkAuth } = require('../../utils');

// * get all posts
const getAllPosts = (req, res, next) =>
  getAllPostsQuery()
    .then(({ rows }) => res.json(rows))
    .catch(next);

// * get user's posts
const getPost = (req, res, next) => {
  const { tokenId, userId } = destructure(req);

  checkAuth(tokenId, userId);

  return getPostQuery(userId)
    .then(({ rows }) => res.json(rows))
    .catch(next);
};

// * create post
const createPost = (req, res, next) => {
  const { tokenId, userId, content, date } = destructure(req);

  checkAuth(tokenId, userId);

  return createPostQuery({ content, date, userId })
    .then(() => res.status(201).end())
    .catch(next);
};

// * edit post
const editPost = (req, res, next) => {
  const { tokenId, userId, postId, content } = destructure(req);

  checkAuth(tokenId, userId);
  return editPostQuery({ content, postId, userId })
    .then(() => res.status(204).end())
    .catch(next);
};

// * delete post
const deletePost = (req, res, next) => {
  const { tokenId, userId, postId } = destructure(req);

  checkAuth(tokenId, userId);

  deletePostQuery({ userId, postId })
    .then(() => res.status(204).end())
    .catch(next);
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
};
