/**
 * Created by Dong Shin on 2/21/18.
 */
'use strict';

exports.allowOnly = function (roles, callback) {
  function checkUserRole(req, res) {
    console.log('checkUserRole - ');

    // check roles against user's roles
    for (let i = 0; i < roles.length; i++) {
      if (req.user.checkRole(roles[i])) {
        // authroized, continue
        callback(req, res);
        return;
      }
    }

    // unauthorized, send error
    res.status(403).send({ message: 'unauthorized - ' });
    return;
  }

  return checkUserRole;
};

