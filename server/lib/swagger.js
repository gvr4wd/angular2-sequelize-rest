'use strict';

const config       = require('./config')();
const swaggerJSDoc = require('swagger-jsdoc');
const express      = require('express');
const appRoot   = require('app-root-path');

const swagger = (app) => {
  const swaggerSpec = swaggerJSDoc({
    swaggerDefinition : config.swagger,
    apis              : [`${appRoot}/server/app/controllers/**/*.js`]
  });

  app.use('/docs', express.static(`${appRoot}/server/public/swagger`));

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};

module.exports = swagger;
