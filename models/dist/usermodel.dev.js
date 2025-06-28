"use strict";

var mongoose = require('mongoose');

var validator = require('validator');

var jwt = require('jsonwebtoken');

var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is Required']
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true,
    validate: function validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error('please Enter Valid Email');
      }
    }
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
    validate: function validate(val) {
      if (!validator.isStrongPassword(val)) {
        throw new Error('please Enter Strong Password');
      }
    }
  },
  role: {
    type: String,
    "default": 'user'
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tasks'
  }],
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
});
userSchema.pre('save', function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (!this.isModified('password')) {
            _context.next = 5;
            break;
          }

          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(this.password, 8));

        case 4:
          this.password = _context.sent;

        case 5:
          // if (this.role === 'admin') {
          //   throw new Error('you cant set admin role');
          // }
          next();
          _context.next = 11;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          next(_context.t0);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, this, [[0, 8]]);
});

userSchema.statics.login = function _callee2(email, password) {
  var user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = this.findOne({
            email: email
          });
          _context2.t0 = !user;

          if (!_context2.t0) {
            _context2.next = 6;
            break;
          }

          _context2.next = 5;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 5:
          _context2.t0 = _context2.sent;

        case 6:
          if (!_context2.t0) {
            _context2.next = 8;
            break;
          }

          throw new Error('Invalid Email or Password');

        case 8:
          return _context2.abrupt("return", user);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, this);
};

userSchema.methods.generateToken = function _callee3() {
  var token;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          token = jwt.sign({
            _id: this._id.toString(),
            name: this.name,
            email: this.email
          }, process.env.JWT_SECRET);
          this.tokens = this.tokens.concat({
            token: token
          });
          this.save();
          return _context3.abrupt("return", token);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          throw new Error('Error when jwt');

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, this, [[0, 7]]);
};

userSchema.statics.update = function _callee4(req) {
  var user, fields, blocked, _i, _fields, key, isSame;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(this.findOne({
            _id: req.user._id
          }));

        case 3:
          user = _context4.sent;
          fields = Object.keys(req.body);
          blocked = ['_id', 'tokens', 'role'];
          _i = 0, _fields = fields;

        case 7:
          if (!(_i < _fields.length)) {
            _context4.next = 25;
            break;
          }

          key = _fields[_i];

          if (!blocked.includes(key)) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("continue", 22);

        case 11:
          if (!(key === 'password')) {
            _context4.next = 21;
            break;
          }

          _context4.next = 14;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 14:
          isSame = _context4.sent;

          if (isSame) {
            _context4.next = 19;
            break;
          }

          _context4.next = 18;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 18:
          user.password = _context4.sent;

        case 19:
          _context4.next = 22;
          break;

        case 21:
          user[key] = req.body[key];

        case 22:
          _i++;
          _context4.next = 7;
          break;

        case 25:
          console.log(user);
          _context4.next = 28;
          return regeneratorRuntime.awrap(user.save());

        case 28:
          return _context4.abrupt("return", user);

        case 31:
          _context4.prev = 31;
          _context4.t0 = _context4["catch"](0);
          throw new Error(_context4.t0.message);

        case 34:
        case "end":
          return _context4.stop();
      }
    }
  }, null, this, [[0, 31]]);
};

userSchema.methods.toJSON = function () {
  var user = this.toObject();
  delete user.tokens;
  delete user.password;
  return user;
};

var User = mongoose.model('users', userSchema);
module.exports = {
  User: User
};