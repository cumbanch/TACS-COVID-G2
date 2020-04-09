const app = require('./app');

const port = 8080;

Promise.resolve()
  .then(() => {
    app.listen(port);
    console.log(`Listening on port: ${port}`);
  })
  .catch(console.log);
