const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    required: [true, 'A user must have a otp'],
    select: false,
  },
  role: {
    type: String,
    enum: ['user'],
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  // if (!this.isModified('otp')) return next();

  this.otp = await bcrypt.hash(this.otp, 12);

  next();
});

userSchema.methods.correctPassword = async function (userOtp, candidateOtp) {
  return await bcrypt.compare(userOtp, candidateOtp);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
