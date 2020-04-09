const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./app/routes');
const errors = require('./app/middlewares/errors');

const app = express();

// Client must send "Content-Type: application/json" header
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes.init(app);

app.use(errors.handle);

module.exports = app;
