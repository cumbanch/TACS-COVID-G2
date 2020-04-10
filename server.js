const app = require('./app');
const logger = require('./app/logger');

const port = 8080;

Promise.resolve()
  .then(() => {
    app.listen(port);
    logger.info(`Listening on port: ${port}`);
  })
  .catch(logger.error);
