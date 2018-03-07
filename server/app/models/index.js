'use strict';

const Sequelize = require('sequelize');
const appRoot   = require('app-root-path');
const walkSync = require('walk-sync');

const config = require(`${appRoot}/server/lib/config`)();

const db = {};

const sequelize = new Sequelize(config.db);

const paths = walkSync(`${appRoot}/server/app/models`, {
  globs  : ['**/*.js'],
  ignore : ['index.js']
});

paths.forEach((file) => {
  const model    = sequelize.import(`${appRoot}/server/app/models/${file}`);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
