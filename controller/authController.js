const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
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
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
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
  });
  createSendToken(newUser, 201, req, res);
});
exports.sendOTP = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    next(new AppError('Please provide email.', 400));
  }

  const randomNumber = Math.trunc(Math.random() * 1000000);
  const timeStamp = Date.now() + 10 * 60 * 1000;

  const user = await User.findOneAndUpdate(
    { email },
    { otp: randomNumber, expiresAt: timeStamp },
    {
      new: true,
    }
  );
  new Email(user, randomNumber).sendOTP();

  res.status(200).json({
    status: 'success',
    message: 'OTP sent successfully',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return next(new AppError('Please provide email and otp', 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('user email is invalid', 401));
  }
  if (Date.now() > user.expiresAt) {
    return next(new AppError('Your OTP has expired. Please try again!', 400));
  }
  if (Number(otp) !== user.otp) {
    return next(new AppError('Entered OTP is invalid. Please try again', 400));
  }
  user.otp = undefined;
  user.save();

  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    status: 'success',
  });
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log('restricTo');
    // roles = [admin, lead-guide] role = 'user'
    if (!roles.includes(req.user.role)) {
      next(new AppError('you are not authorised to perform this action', 403));
    }
    next();
  };
};

exports.protect = catchAsync(async (req, res, next) => {
  console.log('protect');
  //1. getting token and check if it's there
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  //2. Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3. check if user stil exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError(`the user belonging to the token doesn't exist`, 401));
  }

  // // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});
