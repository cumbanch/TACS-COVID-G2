const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const routes = require('./app/routes');
const errors = require('./app/middlewares/errors');
const swaggerDocument = require('./documentation/swagger.json');
const { logRequests } = require('./app/middlewares/logger_requests');
const { configurateCors } = require('./app/middlewares/cors');

const app = express();

// Client must send "Content-Type: application/json" header
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logRequests);

app.use(configurateCors);

routes.init(app);

app.use(errors.handle);

module.exports = app;
