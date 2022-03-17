const getAllPostsSql = `SELECT posts.content as post_content, posts.id, posts.image_url, posts.user_id, users.username, users.avatar, posts.date
                      FROM posts
                        JOIN users on posts.user_id = users.id`;

const getPostSql = `SELECT posts.content as post_content, posts.id, posts.image_url, posts.user_id, users.username, users.avatar, posts.date
                    FROM posts 
                    JOIN users on posts.user_id = $1 AND users.id = posts.user_id`;

const createPostSql = 'INSERT INTO posts (content, date, user_id, image_url) values ($1, $2, $3, $4) RETURNING *';

const editPostSql = 'UPDATE posts SET content = $1, image_url = $4 WHERE id = $2 AND user_id = $3';

const deleteSqlQuery = 'DELETE FROM posts WHERE id = $1 AND user_id = $2';

module.exports = {
  getAllPostsSql,
  getPostSql,
  createPostSql,
  editPostSql,
  deleteSqlQuery,
};
