'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('User', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preferenceStr: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lastLoggedIn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jwtToken: {
      type: DataTypes.VIRTUAL,
      set: function (val) {
        this.setDataValue('jwtToken', val);
      }
    }
  }, {
    tableName: 'users'
  });

  // Association
  model.associate = function (models) {
    model.belongsToMany(models.Role, {through: models.UserRole, as: 'roles'});
    model.belongsToMany(models.Group, {through: models.UserGroup, as: 'groups'});
  }

  // Compares two passwords.
  model.prototype.comparePasswords = function (password, callback) {
    console.log('comparePasswords()');
    bcrypt.compare(password, this.password, function (error, isMatch) {
      if (error) {
        return callback(error);
      }
      return callback(null, isMatch);
    });
  }

  // Compares two passwords.
  model.prototype.setJwtToken = function (jwtToken) {
    console.log('setJwtToken()');
    this.jwtToken = jwtToken;
  };

  // check role
  model.prototype.checkRole = function (role) {
    console.log('checkRole()');
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].role.toLowerCase() === role.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  // Hashes the password for a user object.
  model.hook('beforeValidate', (user, options) => {
    console.log('hashPassowrd()');
    if (user.changed('password')) {
      return bcrypt.hash(user.password, 10).then(function (password) {
        user.password = password;
      });
    }
  });

  return model;
};
