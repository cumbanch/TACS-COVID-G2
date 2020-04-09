const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

const routes = require('./app/routes');
const errors = require('./app/middlewares/errors');
const documentation = require('./documentation');

const app = express();

// Client must send "Content-Type: application/json" header
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

routes.init(app);

app.use(errors.handle);

module.exports = app;
