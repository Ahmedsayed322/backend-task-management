"use strict";

var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  addedby: {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId
      },
      name: {
        type: String,
        ref: 'users',
        required: true
      }
    }
  }
});
var Task = mongoose.model('taskes', taskSchema);
module.exports = {
  Task: Task
};