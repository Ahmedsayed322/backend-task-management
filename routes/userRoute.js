const { userAuth } = require('../middlewares/userAuth');
const { User } = require('../models/usermodel');

const express = require('express');
userRoute = express.Router();
userRoute.get('/user/profile', userAuth, (req, res) => {
  res.status(200).json(req.user);
});
userRoute.patch('/user/update', userAuth, async (req, res) => {
  try {
    const user = await User.update(req);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});
module.exports = {
  userRoute,
};
