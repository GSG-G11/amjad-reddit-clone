const port = process.env.PORT;
require('./app').listen(
  process.env.PORT,
  () => console.log(`app is live on http://localhost:${port}`),
);
