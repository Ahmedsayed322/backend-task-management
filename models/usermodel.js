const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
  name: { type: String, required: [true, 'name is Required'] },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error('please Enter Valid Email');
      }
    },
  },
  password: {
    type: String,
    required: [true, 'Password is Required'],
    validate(val) {
      if (!validator.isStrongPassword(val)) {
        throw new Error('please Enter Strong Password');
      }
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tasks' }],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    // if (this.role === 'admin') {
    //   throw new Error('you cant set admin role');
    // }
    next();
  } catch (e) {
    next(e);
  }
});
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user || (await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid Email or Password');
  }
  return user;
};
userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign(
      {
        _id: this._id.toString(),
        name: this.name,
        email: this.email,
      },
      process.env.JWT_SECRET
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (err) {
    throw new Error('Error when jwt');
  }
};
userSchema.statics.update = async function (req) {
  try {
    const user = await this.findOne({ _id: req.user._id });

    const fields = Object.keys(req.body);
    const blocked = ['_id', 'tokens', 'role'];

    for (const key of fields) {
      if (blocked.includes(key)) continue;

      if (key === 'password') {
        const isSame = await bcrypt.compare(req.body.password, user.password);
        if (!isSame) {
          user.password = await bcrypt.hash(req.body.password, 10);
        }
      } else {
        user[key] = req.body[key];
      }
    }
    console.log(user);
    await user.save();
    return user;
  } catch (e) {
    throw new Error(e.message);
  }
};
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.tokens;
  delete user.password;
  return user;
};

const User = mongoose.model('users', userSchema);

module.exports = {
  User,
};
