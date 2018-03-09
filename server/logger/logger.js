/* eslint-disable semi */
/**
 * Created by Dong Shin on 3/9/18.
 */
'use strict';

const winston = require('winston');
require('winston-mysql-transport').Mysql;

const config = require('./..//lib/config')();


/**
 * console loggeing config
 * @returns {string}
 */
const tsFormat = () => (new Date()).toISOString();
const consoleTransport = new (winston.transports.Console)({
  timestamp: tsFormat,
  colorize: true
});

/**
 * database logging config
 * @type {winston.transports.Mysql}
 * database table 'logs' must exist prior to loading to avoid app crash!!!
 * use server/database/logs.sql for table information
 */
const databaseTransport = new (winston.transports.Mysql)({
  database : config.db.database,
  table : 'logs',
  user : config.db.username,
  password : config.db.password
});


const logger = new (winston.Logger)({
  transports: [
    consoleTransport,
    databaseTransport
  ]
});

module.exports = logger;
