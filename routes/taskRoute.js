const express = require('express');
const { adminAuth } = require('../middlewares/adminAuth');
const { Task } = require('../models/taskmodel');
const { User } = require('../models/usermodel');
const { default: mongoose } = require('mongoose');
const taskRoute = express.Router();
taskRoute.post('/admin/tasks/add', adminAuth, async (req, res) => {
  try {
    const task = new Task(req.body);
    task.addedby.user.id = req.admin._id;
    task.addedby.user.name = req.admin.name;
    await User.findByIdAndUpdate(req.admin._id, {
      $push: { tasks: task._id },
    });
    await task.save();
    res.status(200).json({ task });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
taskRoute.get('/admin/taskes', adminAuth, async (req, res) => {
  try {
    const taskes = await Task.find({ 'addedby.user.id': req.admin._id });

    if (taskes.length === 0) {
      return res.status(200).json({ message: 'No tasks found' });
    }

    res.status(200).json({ taskes });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
taskRoute.delete('/admin/taskes/delete/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({
      _id: id,
      'addedby.user.id': req.admin._id,
    });
    const user = await User.findById(req.admin._id);

    if (!task || !user) {
      return res.status(404).json({
        message:
          'this task is maybe deleted or you dont have access to delete id',
      });
    }
    user.tasks = user.tasks.filter((t) => t.toString() !== id);
    await user.save();
    res.status(200).json({ message: 'task deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
taskRoute.patch('/admin/task/:id', adminAuth, async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findOneAndUpdate(
      {
        _id,
        'addedby.user.id': req.admin._id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      return res.status(404).json({ message: 'task not found' });
    }
    return res.status(200).json(task);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
module.exports = {
  taskRoute,
};
