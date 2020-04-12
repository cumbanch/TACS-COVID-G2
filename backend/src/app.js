const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const { inspect } = require('util');

const routes = require('./app/routes');
const errors = require('./app/middlewares/errors');
const swaggerDocument = require('./documentation/swagger.json');
const logger = require('./app/logger');

const app = express();

// Client must send "Content-Type: application/json" header
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res, next) => {
  logger.info(
    `New request in ${req.path} with method ${req.method} with params: ${inspect(
      req.params
    )}, body: ${inspect(req.body)} and query: ${inspect(req.query)}`
  );
  next();
});
routes.init(app);

app.use(errors.handle);

module.exports = app;
