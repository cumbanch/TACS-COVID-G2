require('dotenv').config();

const config = {
  database: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    name: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    logging: process.env.POSTGRES_LOGGING,
    dialect: 'postgres'
  },
  migrations: {
    automaticallyUp: process.env.AUTOMATICALLY_UP
  }
};

module.exports = config;
