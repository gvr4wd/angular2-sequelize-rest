'use strict';
const jwt = require('jsonwebtoken');

const config = require('./../../../lib/config')();

const allowOnly = require('./../../../middleware/routes-helper').allowOnly;
const Users = require('./lib/index');

const users = new Users();

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - login
 *       - password
 *       - lastName
 *       - firstName
 *       - email
 *     properties:
 *       login:
 *         type: string
 *       password:
 *         type: string
 *       lastName:
 *         type: string
 *       firstName:
 *         type: string
 *       email:
 *         type: string
 *       avatar:
 *         type: string
 *       preferenceStr:
 *         type: string
 *       lastLoggedIn:
 *         type: string
 *         format: date-time
 *       roles:
 *         properties:
 *           items:
 *             type: array
 *             description: list of roles
 *             items:
 *               "$ref": "#/definitions/Role"
 */
module.exports = (app, passport, logger) => {
  this.logger = logger;
  /**
   * @swagger
   * /api/users:
   *   post:
   *     summary: Add a user
   *     description: Add a user as a JSON object
   *     tags:
   *       - Users
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: "User object that needs to be added to the application"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/User"
   *     responses:
   *       200:
   *         description: "successful operation"
   */
  app.post('/api/users', (req, res) => {
    users
      .add(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });


  /**
   * @swagger
   * /api/users/{id}/role:
   *   post:
   *     summary: Add a role to a user
   *     description: Add a role to a user as a JSON object
   *     tags:
   *       - Users
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: "Role object that needs to be added to the user"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/Role"
   *     responses:
   *       200:
   *         description: "successful operation"
   */
  app.post('/api/users/:id/role', (req, res) => {
    users
      .add(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  /**
   * @swagger
   * /api/users:
   *   get:
   *     summary: List all users
   *     description: List all users as an JSON array
   *     tags:
   *       - Users
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "successful operation"
   *         schema:
   *           type: array
   *           items:
   *             "$ref": "#/definitions/User"
   */
  app.get('/api/users', (req, res) => {
    users
      .list()
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  /**
   * @swagger
   * /api/users/login:
   *   get:
   *     summary: login as a user
   *     description: login as a user
   *     tags:
   *       - Users
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: login
   *         in: query
   *         description: "user login"
   *         required: true
   *         type: string
   *       - name: password
   *         in: query
   *         description: "user password"
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: "successful operation"
   *         schema:
   *           "$ref": "#/definitions/User"
   *       404:
   *         description: "not found"
   *       400:
   *         description: "bad request"
   */
  app.get('/api/users/login', (req, res) => {
    logger.info('login requested - ' + req.query.login + ' - ' + req.query.password)
    users
      .login(req.query.login, req.query.password)
      .then((data) => {
        if (data <= 0) {
          res.sendStatus(404);
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  /**
   * @swagger
   * /api/users/login:
   *   post:
   *     summary: login
   *     description: login
   *     tags:
   *       - Users
   *     produces:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: body
   *         description: "User object that needs to be authorized"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/User"
   *     responses:
   *       200:
   *         description: "successful operation"
   */
  app.post('/api/users/login', (req, res) => {
    logger.info('login requested - ' + req.body.login + ' - ' + req.body.password);
    let login = req.body.login;
    let password = req.body.password;
    if (!login || !password) {
      res.status(404).send({message: 'login and password are required!'});
    } else {
      users
        .findByLogin(req.body.login)
        .then((user) => {
          if (user <= 0) {
            res.status(404).send({message: 'User not found!'});
          } else {
            user.comparePasswords(password, function (error, isMatch) {
              if (isMatch && !error) {
                var token = jwt.sign(
                  {login: user.login},
                  config.keys.secret,
                  {expiresIn: config.keys.expiresIn}
                );

                user.setJwtToken(token);
                res.send(user);
              } else {
                res.status(404).json({message: 'Login failed!'});
              }
            });
          }
        })
        .catch((error) => {
          res.status(400).send(error);
        });
    }
  });

  /**
   * @swagger
   * /api/users/{id}:
   *   get:
   *     summary: Get a user
   *     description: Get a user
   *     tags:
   *       - Users
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: "user id"
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: "successful operation"
   *         schema:
   *           "$ref": "#/definitions/User"
   *       404:
   *         description: "not found"
   *       400:
   *         description: "bad request"
   */
  app.get('/api/users/:id', (req, res) => {
    users
      .get(req.params.id)
      .then((data) => {
        if (data <= 0) {
          res.sendStatus(404);
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  /**
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     summary: Removes a user
   *     description: Removes a user
   *     tags:
   *       - Users
   *     parameters:
   *       - name: id
   *         in: path
   *         description: "user id"
   *         required: true
   *         type: integer
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "successful operation"
   *       404:
   *         description: "not found"
   *       400:
   *         description: "bad request"
   */
  app.delete('/api/users/:id', (req, res) => {
    users
      .remove(req.params.id)
      .then((data) => {
        if (data <= 0) {
          res.sendStatus(404);
        } else {
          res.send({
            success: true
          });
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });

  /**
   * @swagger
   * /api/users/{id}:
   *   patch:
   *     summary: Update a user
   *     description: Update a user
   *     tags:
   *       - Users
   *     parameters:
   *       - name: id
   *         in: path
   *         description: "user id"
   *         required: true
   *         type: integer
   *       - in: body
   *         name: body
   *         description: "User object that needs to be added to the store"
   *         required: true
   *         schema:
   *           "$ref": "#/definitions/User"
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "successful operation"
   *       404:
   *         description: "not found"
   *       400:
   *         description: "bad request"
   */
  app.patch('/api/users/:id', (req, res) => {
    users
      .update(req.params.id, req.body)
      .then((data) => {
        if (data <= 0) {
          res.sendStatus(404);
        } else {
          res.send({
            success: true
          });
        }
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  });
};
