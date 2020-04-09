# covid-19

covid-19

## First steps

#### Installing node

Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)
Nvm approach is preferred.

#### Getting dependencies

Run `npm install` or `yarn` from rootpath of the project.

#### Starting your app

Now, we have two ways to start an app. To start your app in production mode run `npm start` in the root path of your project. To start your app in development mode (nodemon) run `npm run start-dev`. Then access your app at **localhost:port**. The port is logged in the console where you ran the start script.

## Development

#### Environments

By default, the environment will be **development**, but you can easily change it using the **NODE_ENV** environmental variable.

#### Environment variables

`Dotenv` is used for managing environment variables. They are stored in the `/.env` file. Take into account that the variables defined in the `bashrc` are not overrided.

The environment variables should be added to the `.env` file in the form of `NAME=VALUE`, as the following example:

```
DB_USERNAME=root
DB_PASS=superpass
DB_PASSWORD=superpass
PORT=8081
CLIENTS_API=http://api.clients.example.org/
```

**Remember not to push nor commit the `.env` file.**

#### Logging

To log useful information of your program to the console you just need to import the logger located at `app/logger`. There are two possible types of logging: `info` and `error`. You should use them depending on the type of message you want to show.

Here is an example snippet:

```
const logger = require('/app/logger');
...
if (error) {
    logger.error('There is an error);
} else {
    logger.info('There is no error);
}
```

#### Testing

To run your tests you first need to config your testing database by setting the env var `DB_NAME_TEST`. as explained
before in [Database configuration](#database-configuration). Also you need to run the migrations in this exclusive
testing database each time you have new ones, you can do this by running the command `npm run migrations-test`.
Once you have all the above done you can run your tests with the following command: `npm test`. For more information refeer to the documentation of [Jest](https://jestjs.io/docs/en/getting-started).

#### Documentation

Documentation will be served at `/docs`. We use [OpenAPI](https://github.com/OAI/OpenAPI-Specification) A.K.A `Swagger`.
