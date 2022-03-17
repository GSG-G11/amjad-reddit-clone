const validRouter = require('./validation');
const staticRouter = require('./static');
const postsRouter = require('./api/post');
const votesRouter = require('./api/vote');

module.exports = { validRouter, staticRouter, postsRouter, votesRouter };
