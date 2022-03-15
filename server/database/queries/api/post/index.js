const connection = require('../../../config/connection');
const {
  getAllPostsSql,
  getPostSql,
  createPostSql,
  editPostSql,
  deleteSqlQuery,
} = require('./sqlQueries');

const getAllPostsQuery = () => connection.query(getAllPostsSql);

const getPostQuery = (userId) => connection.query(getPostSql, [userId]);

const createPostQuery = ({ content, date, userId }) =>
  connection.query(createPostSql, [content, date, userId]);

const editPostQuery = ({ content, postId, userId }) =>
  connection.query(editPostSql, [content, postId, userId]);

const deletePostQuery = ({ userId, postId }) => connection.query(deleteSqlQuery, [postId, userId]);

module.exports = {
  getAllPostsQuery,
  getPostQuery,
  createPostQuery,
  editPostQuery,
  deletePostQuery,
};
