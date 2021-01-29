const Job = require('../model/jobModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllJobs = catchAsync(async (req, res, next) => {
  const jobs = await Job.find();
  res.status(200).json({
    status: 'success',
    data: {
      jobs,
    },
  });
});
exports.getJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.jobId);
  if (!job) {
    return next(new AppError('No Job found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      job,
    },
  });
});

exports.createJob = catchAsync(async (req, res) => {
  const newJob = await Job.create(req.body);
  console.log(Date.now());
  res.status(201).json({
    status: 'success',
    data: {
      newJob,
    },
  });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
  const job = await Job.findByIdAndDelete(req.params.jobId);
  if (!job) {
    return next(new AppError('No Job found with that id', 404));
  }
  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});
exports.updateJob = catchAsync(async (req, res, next) => {
  const updatedJob = await Job.findByIdAndUpdate(req.params.jobId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedJob) {
    return next(new AppError('No Job found with that id', 404));
  }

  res.status(200).json({
    status: 'sucess',
    data: updatedJob,
  });
});

exports.applyJob = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { jobId } = req.params;
  const job = await Job.findByIdAndUpdate(
    jobId,
    { $push: { user: userId } },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    status: 'success',
    data: {
      job,
    },
  });
});
