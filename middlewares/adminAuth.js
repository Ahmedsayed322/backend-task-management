const jwt = require('jsonwebtoken');
const { User } = require('../models/usermodel');

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).send({ error: 'Authorization header is missing' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const admin = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });
    if (!admin) {
      throw new Error('please login');
    }
    if (admin.role !== 'admin') {
      throw new Error('you dont have an access');
    }
    req.admin = admin;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: e.message });
  }
};
module.exports = {
  adminAuth,
};
////////////////////////////////////////
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
