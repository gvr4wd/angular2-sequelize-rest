'use strict';

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Log', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    meta: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hostname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'logs'
  });

  return model;
};
