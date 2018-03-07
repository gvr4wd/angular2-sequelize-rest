'use strict';

const appRoot = require('app-root-path');

const db      = require(`${appRoot}/server/app/models`);
const Promise = require('bluebird');

/**
 * Class that represents roles orchestration trough database
 */
class Roles {
  /**
   * Adds a role to database
   *
   * @param {Object} role - role JSON object
   */
  add(role) {
    return new Promise((resolve, reject) => {
      db.Role
        .create(role)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * List all roles from database
   *
   * @returns {Array}
   */
  list() {
    return new Promise((resolve, reject) => {
      db.Role
        .findAll({order: [['id', 'DESC']]})
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get a specific role
   *
   * @param {Integer} id - role id
   * @returns {Object}
   */
  get(roleId) {
    return new Promise((resolve, reject) => {
      db.Role
        .findOne({
          where : {
            id : roleId
          }
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Removes a role from database
   *
   * @param {Integer} id - role id
   */
  remove(roleId) {
    return new Promise((resolve, reject) => {
      db.Role
        .destroy({
          where : {
            id : roleId
          }
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Update a specific role on database
   *
   * @param {Integer} id - role id
   */
  update(roleId, data) {
    return new Promise((resolve, reject) => {
      db.Role
        .update(data, {
          where : {
            id : roleId
          }
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = Roles;
