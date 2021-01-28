// var otp = Math.random();
// otp = otp * 1000000;
// otp = parseInt(otp);
// console.log(otp);
// const crypto = require('crypto');
// const { promisify } = require('util');

const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Email = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  });

  //Remove the password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const url = `${req.protocol}://${req.get('host')}/me`;
  //console.log(url);
  await new Email(newUser, url).sendWelcome();
  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  //1.) Check if email and password exist
  if (!email || !otp) {
    return next(new AppError('Please provide email and otp', 400));
  }
  //2.) check if user exist and password is correct
  const user = await User.findOne({ email }).select('+otp');

  if (!user || (await user.correctPassword(otp, user.otp))) {
    return next(new AppError('email or otp is wrong', 401));
  }

  //3.) if everything ok , then send token to client
  createSendToken(user, 200, req, res);
});
