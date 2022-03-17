const {
  getPostQuery,
  createPostQuery,
  getAllPostsQuery,
  editPostQuery,
  deletePostQuery,
} = require('../../database/queries/api/post');
const { destructure, checkAuth } = require('../../utils');
const { postSchema, editPostSchema } = require('../../schemas');

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
  const { tokenId, userId, content, date, img } = destructure(req);
  checkAuth(tokenId, userId);

  postSchema
    .validateAsync({ content, date })
    .then(() =>
      createPostQuery({ content, date, userId, img }).then(({ rows }) =>
        res.status(201).send(rows)))
    .catch(next);
};

// * edit post
const editPost = (req, res, next) => {
  const { tokenId, userId, postId, content, img = null } = destructure(req);

  checkAuth(tokenId, userId);

  editPostSchema
    .validateAsync({ content })
    .then(() => editPostQuery({ content, postId, userId, img }).then(() => res.status(204).end()))
    .catch(next);
};

// * delete post
const deletePost = (req, res, next) => {
  const { tokenId, userId, postId } = destructure(req);

  checkAuth(tokenId, userId);

  deletePostQuery({ userId, postId })
    .then(() => res.status(204).send({ status: 401, msg: 'Post Deleted' }))
    .catch(next);
};

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
};
