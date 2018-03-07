'use strict';

const appRoot = require('app-root-path');

const db = require(`${appRoot}/server/app/models`);
const Promise = require('bluebird');

/**
 * Class that represents users orchestration trough database
 */
class Users {
    /**
     * Adds a user to database
     *
     * @param {Object} user - user JSON object
     */
    add(user) {
        return new Promise((resolve, reject) => {
            db.User
                .create(user)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * List all users from database
     *
     * @returns {Array}
     */
    list() {
        return new Promise((resolve, reject) => {
            db.User
                .findAll({
                    include: [
                        // { model: db.Role, as: 'roles'}
                        {all: true}
                    ]
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
     * Get a specific user
     *
     * @param {Integer} id - user id
     * @returns {Object}
     */
    get(userId) {
        return new Promise((resolve, reject) => {
            db.User
                .findOne({
                    where: {
                        id: userId
                    },
                    include: [
                        // { model: db.Role, as: 'roles'}
                        {all: true}
                    ]
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
     * Get a specific user
     *
     * @param {Integer} id - user id
     * @returns {Object}
     */
    login(login, password) {
        return new Promise((resolve, reject) => {
            db.User
                .findOne({
                    where: {
                        login: login,
                        password: password
                    },
                    include: [
                        {all: true}
                    ]
                })
                .then((user) => {
                    let date = new Date();
                    console.log(date);
                    user
                        .updateAttributes({
                            lastLoggedIn: date
                        })
                        .then((res) => {
                            resolve(res);
                        })
                        .catch((error) => {
                            reject(error);
                        });

                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * find by login
     *
     * @param {String} login - user login
     * @returns {Object}
     */
    findByLogin(login) {
        return new Promise((resolve, reject) => {
            db.User
                .findOne({
                    where: {
                        login: login
                    },
                    include: [
                        {all: true}
                    ]
                })
                .then((user) => {
                    let date = new Date();
                    console.log(date);
                    user
                        .updateAttributes({
                            lastLoggedIn: date
                        })
                        .then((res) => {
                            resolve(res);
                        })
                        .catch((error) => {
                            reject(error);
                        });

                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * Removes a user from database
     *
     * @param {Integer} id - user id
     */
    remove(userId) {
        return new Promise((resolve, reject) => {
            db.User
                .destroy({
                    where: {
                        id: userId
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
     * Update a specific user on database
     *
     * @param {Integer} id - user id
     */
    update(userId, data) {
        return new Promise((resolve, reject) => {
            db.User
                .update(data, {
                    where: {
                        id: userId
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

module.exports = Users;
