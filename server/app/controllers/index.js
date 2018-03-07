'use strict';

const appRoot  = require('app-root-path');
const walkSync = require('walk-sync');

const req = require;

module.exports = (app) => {
  const paths = walkSync(`${appRoot}/server/app/controllers`, {
    globs  : ['**/*.js'],
    ignore : ['index.js', '**/lib/*.js', '**/tests/*.js']
  });

  paths.forEach((path) => {
    req(`${appRoot}/server/app/controllers/${path}`)(app);
  });
};
