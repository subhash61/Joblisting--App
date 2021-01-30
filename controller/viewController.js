const Job = require('../model/jobModel');
const catchAsync = require('../utils/catchAsync');

exports.login = (req, res) => {
  res.status(200).render('login', {
    title: 'LOGIN',
  });
};

exports.renderUser = catchAsync(async (req, res, next) => {
  const jobs = await Job.find();
  res.status(200).render('user', {
    title: 'User',
    jobs,
  });
});

exports.renderEmployer = catchAsync(async (req, res, next) => {
  res.status(200).render('employer', {
    title: 'Employer',
  });
});
