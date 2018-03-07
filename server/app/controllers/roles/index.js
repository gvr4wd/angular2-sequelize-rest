'use strict';

const Roles = require('./lib/index');

const roles = new Roles();

/**
 * @swagger
 * definitions:
 *   Role:
 *     type: object
 *     required:
 *       - role
 *     properties:
 *       id:
 *         type: integer
 *       role:
 *         type: string
 */
module.exports = (app, passport, logger) => {
  /**
   * @swagger
   * /api/roles:
   *   get:
   *     summary: List all roles
   *     description: List all roles as an JSON array
   *     tags:
   *       - Roles
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: "successful operation"
   *         schema:
   *           type: array
   *           items:
   *             "$ref": "#/definitions/Role"
   */
  app.get('/api/roles', (req, res) => {
    roles
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
   * /api/roles/{id}:
   *   get:
   *     summary: Get a role
   *     description: Get a role
   *     tags:
   *       - Roles
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         description: "role id"
   *         required: true
   *         type: integer
   *     responses:
   *       200:
   *         description: "successful operation"
   *         schema:
   *           "$ref": "#/definitions/Role"
   *       404:
   *         description: "not found"
   *       400:
   *         description: "bad request"
   */
  app.get('/api/roles/:id', (req, res) => {
    roles
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
};
