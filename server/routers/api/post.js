const postsRouter = require('express').Router();

const auth = require('../../middlewares/auth');

const {
  getAllPosts,
  getPost,
  createPost,
  editPost,
  deletePost,
} = require('../../controllers/api/post');

postsRouter.get('/allPosts', getAllPosts);

postsRouter
  .route('/post/:id')
  .get(auth, getPost)
  .post(auth, createPost)
  .patch(auth, editPost)
  .delete(auth, deletePost);

module.exports = postsRouter;
