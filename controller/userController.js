const fs = require('fs');
const multer = require('multer');
const User = require('../model/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

// const deleteResume = (req) => {
// const resume = fs.readdirSync('./public/users/resume');
// const el = resume.find((el) => el.split('-')[1] === req.user.id);
// if (el) {
//   fs.unlink(`./public/users/resume/${el}`, function);
// }
// };

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // eslint-disable-next-line no-console
    console.log('multerStorage');

    cb(null, 'public/users/resume');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    // deleteResume(req);
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  const fileId = [];
  fs.readdir('./public/users/resume', (err, files) => {
    files.forEach((el) => {
      fileId.push(el.split('-')[1]);
    });

    console.log('fileId:', fileId);
  });
  console.log('multerFilter');
  if (file.mimetype.startsWith('application/pdf')) {
    cb(null, true);
  } else {
    cb(new AppError('Not pdf! Please upload resume in pdf format.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadUserResume = upload.single('resume');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.updateMe = catchAsync(async (req, res, next) => {
  //1.) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.resume = req.file.filename;
  //2.) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query).filter().sort().limitFields().pagination();
  const users = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return next(new AppError('No user found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});
