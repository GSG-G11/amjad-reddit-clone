const votesRouter = require('express').Router();

const auth = require('../../middlewares/auth');

const { handleVoteUp, handleVoteDown } = require('../../controllers/api/vote');

votesRouter.route('/voteUp/:id').put(auth, handleVoteUp);
votesRouter.route('/voteDown/:id').put(auth, handleVoteDown);

module.exports = votesRouter;
