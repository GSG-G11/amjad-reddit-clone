const {
  putVoteUp,
  checkIfVoted,
  putVoteDown,
  updateVote,
  removeVote,
} = require('../../database/queries/api/vote');

const { destructure } = require('../../utils');

const handleVoteUp = (req, res, next) => {
  const { userId, postId } = destructure(req);

  checkIfVoted({ userId, postId })
    .then(({ rowCount, rows }) => {
      if (!rowCount) return putVoteUp({ userId, postId }).then(() => res.status(201).end());

      if (rows[0].type === 'up  ') return removeVote({ userId, postId }).then(() => res.end());

      return updateVote({ userId, postId, type: 'up' }).then(() => res.end());
    });
};

const handleVoteDown = (req, res) => {
  const { userId, postId } = destructure(req);

  checkIfVoted({ userId, postId })
    .then(({ rowCount, rows }) => {
      if (!rowCount) return putVoteDown({ userId, postId }).then(() => res.status(201).end());

      if (rows[0].type === 'down') return removeVote({ userId, postId }).then(() => res.end());

      return updateVote({ userId, postId, type: 'down' }).then(() => res.end());
    });
};

module.exports = { handleVoteUp, handleVoteDown };
