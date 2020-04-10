const app = require('./app');
const { info, error } = require('./app/logger');

const port = 8080;

Promise.resolve()
  .then(() => {
    app.listen(port);
    info(`Listening on port: ${port}`);
  })
  .catch(error);
