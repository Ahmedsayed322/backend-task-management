"use strict";

var express = require('express');

var _require = require('../middlewares/adminAuth'),
    adminAuth = _require.adminAuth;

var _require2 = require('../models/taskmodel'),
    Task = _require2.Task;

var _require3 = require('../models/usermodel'),
    User = _require3.User;

var _require4 = require('mongoose'),
    mongoose = _require4["default"];

var taskRoute = express.Router();
taskRoute.post('/admin/tasks/add', adminAuth, function _callee(req, res) {
  var task;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          task = new Task(req.body);
          task.addedby.user.id = req.admin._id;
          task.addedby.user.name = req.admin.name;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(req.admin._id, {
            $push: {
              tasks: task._id
            }
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(task.save());

        case 8:
          res.status(200).json({
            task: task
          });
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          res.status(500).json({
            message: _context.t0.message
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
});
taskRoute.get('/admin/taskes', adminAuth, function _callee2(req, res) {
  var taskes;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Task.find({
            'addedby.user.id': req.admin._id
          }));

        case 3:
          taskes = _context2.sent;

          if (!(taskes.length === 0)) {
            _context2.next = 6;
            break;
          }

          return _context2.abrupt("return", res.status(200).json({
            message: 'No tasks found'
          }));

        case 6:
          res.status(200).json({
            taskes: taskes
          });
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(500).json({
            message: _context2.t0.message
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
taskRoute["delete"]('/admin/taskes/delete/:id', adminAuth, function _callee3(req, res) {
  var id, task, user;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Task.findOneAndDelete({
            _id: id,
            'addedby.user.id': req.admin._id
          }));

        case 4:
          task = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(User.findById(req.admin._id));

        case 7:
          user = _context3.sent;

          if (!(!task || !user)) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            message: 'this task is maybe deleted or you dont have access to delete id'
          }));

        case 10:
          user.tasks = user.tasks.filter(function (t) {
            return t.toString() !== id;
          });
          _context3.next = 13;
          return regeneratorRuntime.awrap(user.save());

        case 13:
          res.status(200).json({
            message: 'task deleted'
          });
          _context3.next = 19;
          break;

        case 16:
          _context3.prev = 16;
          _context3.t0 = _context3["catch"](0);
          res.status(500).json({
            message: _context3.t0.message
          });

        case 19:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 16]]);
});
module.exports = {
  taskRoute: taskRoute
};