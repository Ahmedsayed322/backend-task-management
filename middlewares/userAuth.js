const jwt = require('jsonwebtoken');
const { User } = require('../models/usermodel');
const userAuth = async function (req, res, next) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    console.log("adasdasd")
    return res.status(401).send({ error: 'Please authenticate.' });
  }
};
module.exports = {
  userAuth,
};
