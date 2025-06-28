const { adminAuth } = require('../middlewares/adminAuth');
const { User } = require('../models/usermodel');

const adminRoute = require('express')();
adminRoute.get('/admin/profile', adminAuth, (req, res) => {
  res.status(200).json(req.admin);
});
adminRoute.get('/admin/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    return res.status(200).json({ users: users });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});
adminRoute.delete('/admin/user/delete/:id', adminAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});
module.exports = {
  adminRoute,
};
