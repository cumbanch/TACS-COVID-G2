const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const config = require('../../config');

const { dialect, username, password, port, name, host } = config.database;
const connectionString = `${dialect}://${username}:${password}@${host}:${port}/${name}`;
const basename = path.basename(__filename);
const db = {};
const sequelize = new Sequelize(connectionString);

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
