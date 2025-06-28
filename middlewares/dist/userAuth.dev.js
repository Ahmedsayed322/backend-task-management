"use strict";

var jwt = require('jsonwebtoken');

var _require = require('../models/usermodel'),
    User = _require.User;

var userAuth = function userAuth(req, res, next) {
  var token, decoded, user;
  return regeneratorRuntime.async(function userAuth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          token = req.header('Authorization').replace('Bearer ', '');
          _context.next = 4;
          return regeneratorRuntime.awrap(jwt.verify(token, process.env.JWT_SECRET));

        case 4:
          decoded = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            _id: decoded._id,
            'tokens.token': token
          }));

        case 7:
          user = _context.sent;

          if (user) {
            _context.next = 10;
            break;
          }

          throw new Error();

        case 10:
          req.user = user;
          req.token = token;
          next();
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          console.log("adasdasd");
          return _context.abrupt("return", res.status(401).send({
            error: 'Please authenticate.'
          }));

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 15]]);
};

module.exports = {
  userAuth: userAuth
};