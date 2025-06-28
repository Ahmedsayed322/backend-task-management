"use strict";

var jwt = require('jsonwebtoken');

var _require = require('../models/usermodel'),
    User = _require.User;

var adminAuth = function adminAuth(req, res, next) {
  var authHeader, token, decoded, admin;
  return regeneratorRuntime.async(function adminAuth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          authHeader = req.header('Authorization');

          if (authHeader) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", res.status(401).send({
            error: 'Authorization header is missing'
          }));

        case 4:
          token = authHeader.replace('Bearer ', '');
          _context.next = 7;
          return regeneratorRuntime.awrap(jwt.verify(token, process.env.JWT_SECRET));

        case 7:
          decoded = _context.sent;
          _context.next = 10;
          return regeneratorRuntime.awrap(User.findOne({
            _id: decoded._id,
            'tokens.token': token
          }));

        case 10:
          admin = _context.sent;

          if (admin) {
            _context.next = 13;
            break;
          }

          throw new Error('please login');

        case 13:
          if (!(admin.role !== 'admin')) {
            _context.next = 15;
            break;
          }

          throw new Error('you dont have an access');

        case 15:
          req.admin = admin;
          req.token = token;
          next();
          _context.next = 23;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          res.status(401).send({
            error: _context.t0.message
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
};

module.exports = {
  adminAuth: adminAuth
}; ////////////////////////////////////////
// const jwt = require('jsonwebtoken');
// const { User } = require('../models/usermodel');
// const adminAuth = async (req, res, next) => {
//   try {
//     const token = req.header('Authorization').replace('Bearer ', '');
//     const decoded = await jwt.verify(token, process.env.JWT_SECRET);
//     const admin = await User.findOne({
//       _id: decoded._id,
//       'tokens.token': token,
//     });
//     if (!admin) {
//       throw new Error();
//     }
//     if (admin.role !== 'admin') {
//       throw new Error('you dont have an access');
//     }
//     req.admin = admin;
//     req.token = token;
//     next();
//   } catch (e) {
//     res.status(401).send({ error: e.message || 'Please authenticate.' });
//   }
// };
// module.exports = {
//   adminAuth,
// };