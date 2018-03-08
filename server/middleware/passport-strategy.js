/**
 * Created by Dong Shin on 2/21/18.
 */
'use strict';

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const db = require('../app/models');
// config = require('./../config');

const config = require('./../lib/config')();

// Hooks the JWT Strategy.
function hookJWTStrategy(passport) {
  // TODO: Set up Passport to use the JWT Strategy.
  const options = {};

  options.secretOrKey = config.keys.secret;
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  options.ignoreExpiration = false;

  passport.use(new JWTStrategy(options, (JWTPayload, callback) => {
    console.log('hookJWTStrategy()');
    db.User.findOne({
      where: { login: JWTPayload.login },
      include: [{ all: true }]
    })
      .then(user => {
        if (!user) {
          callback(null, false);
          return;
        }

        callback(null, user);
        return;
      });
  }));
}

module.exports = hookJWTStrategy;
