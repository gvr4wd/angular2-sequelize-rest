'use strict';

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('Role', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'roles'
  });

  model.associate = function (models) {
    model.belongsToMany(models.User, { through: models.UserRole, as: 'users' });
  }

  return model;
};
