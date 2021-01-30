const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'User must have a name'],
  },
  email: {
    type: String,
    required: [true, 'A user must have an email'], //validater
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide a valid Email'],
  },
  otp: {
    type: Number,
  },
  resume: {
    type: String,
  },

  role: {
    type: String,
    enum: ['user', 'employer'],
    default: 'user',
  },
  expiresAt: {
    type: Number,
    select: false,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
