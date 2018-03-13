'use strict';

const express = require('express');
const swagger = require('./lib/swagger');
const bodyParser = require('body-parser');
const db = require('./app/models/index');
const config = require('./lib/config')();
const sequelizeFixtures = require('sequelize-fixtures');

const app = express();

// logger
const logger = require('./logger/logger');

logger.level = 'debug';
logger.info('staring application....');


app.set('view engine', 'html');
app.set('views', 'public');
app.set('port', config.api.port);


// Sequelize database set up
db.sequelize.sync({force: config.db.wipe}).then(() => {
  logger.debug('Database synced ' + config.db.wipe + ' - data it\'s wiped & schema recreated');
  // from file
  const fixtureFiles = [
    './fixtures/users.json',
    './fixtures/groups.json',
    './fixtures/roles.json'];
  sequelizeFixtures.loadFiles(fixtureFiles, db).then(function () {
    logger.debug('test data loaded');
  });
});


// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization, Referer');
  next();
});

// init swagger
if (config.environment === 'local' || config.environment === 'dev') {
  swagger(app);
}

// init server
app.listen(config.api.port, () => {
  logger.info(`listening on port ${config.api.port}`); // eslint-disable-line no-console
});

// load API routes
require('./app/controllers/index')(app);
