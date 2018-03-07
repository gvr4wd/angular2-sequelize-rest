'use strict';

module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define('UserGroup', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    });

    return model;
};
