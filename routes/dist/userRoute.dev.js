"use strict";

var _require = require('../middlewares/userAuth'),
    userAuth = _require.userAuth;

var _require2 = require('../models/usermodel'),
    User = _require2.User;

var express = require('express');

userRoute = express.Router();
userRoute.get('/user/profile', userAuth, function (req, res) {
  res.status(200).json(req.user);
});
userRoute.patch('/user/update', userAuth, function _callee(req, res) {
  var user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(User.update(req));

        case 3:
          user = _context.sent;

          if (user) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));

        case 6:
          return _context.abrupt("return", res.status(200).json(user));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.status(400).json({
            message: _context.t0.message
          }));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
module.exports = {
  userRoute: userRoute
};