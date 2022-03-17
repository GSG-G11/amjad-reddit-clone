const connection = require('../../../config/connection');

const checkIfVoted = ({ postId, userId }) =>
  connection.query('select * from votes where post_id = $1 and user_Id = $2', [postId, userId]);

const putVoteUp = ({ postId, userId }) =>
  connection.query("insert into votes (type, user_id, post_id) values('up', $1, $2)", [
    userId,
    postId,
  ]);

const putVoteDown = ({ postId, userId }) =>
  connection.query("insert into votes (type, user_id, post_id) values('down', $1, $2)", [
    userId,
    postId,
  ]);

const updateVote = ({ postId, userId, type }) =>
  connection.query('update votes set type = $3 where user_id = $1 and post_id = $2', [
    userId,
    postId,
    type,
  ]);

const removeVote = ({ postId, userId }) => connection.query('delete from votes where user_id = $1 and post_id = $2', [userId, postId]);
module.exports = { checkIfVoted, putVoteUp, putVoteDown, updateVote, removeVote };
