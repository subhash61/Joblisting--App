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
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user must confirm password'],
    validate: {
      //This only works on . create and save
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  role: {
    type: String,
    enum: ['user', 'employer'],
    default: 'user',
  },
});

userSchema.pre('save', async function (next) {
  //Hash the password at the cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete passwordConfirm from the database
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
