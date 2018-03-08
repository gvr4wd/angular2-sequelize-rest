'use strict';

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Group', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'groups'
  });

  model.associate = function (models) {
    model.belongsToMany(models.User, {through: models.UserGroup, as: 'users'});
  }

  return model;
};
