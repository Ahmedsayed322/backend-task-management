const { User } = require('../models/usermodel');

const SignRouter = require('express')();
SignRouter.post('/user/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    if (user.role === 'admin') {
      return res.status(401).json({ message: 'forbidden' });
    }
    await user.save();
    const token = await user.generateToken();

    return res.status(200).json({ user, token });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});
SignRouter.post('/user/login', async (req, res) => {
  try {
    const user = await User.login(req.body.email, req.body.password);
    const token = await user.generateToken();
    return res.status(200).json({ user, token });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});
module.exports = {
  SignRouter,
};
