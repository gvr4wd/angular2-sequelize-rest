/**
 * Created by Dong Shin on 2/21/18.
 */
'use strict';

let JWTStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

let db = require('./../models');
// config = require('./../config');

const config = require('./../lib/config')();

// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
  // TODO: Set up Passport to use the JWT Strategy.
  var options = {};

  options.secretOrKey = config.keys.secret;
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  options.ignoreExpiration = false;

  passport.use(new JWTStrategy(options, function (JWTPayload, callback) {
    console.log('hookJWTStrategy()');
    db.User.findOne({
      where: {login: JWTPayload.login},
      include: [{all: true}]
    })
      .then(function (user) {
        if (!user) {
          callback(null, false);
          return;
        }

        callback(null, user);
      });
  }));
}

module.exports = hookJWTStrategy;
