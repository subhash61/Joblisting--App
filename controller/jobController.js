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

exports.applyJob = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { jobId } = req.params;
  let job = await Job.findById(jobId);
  const jobTimeStamp = parseInt(job.expireDate.getTime(), 10);
  if (Date.now() > jobTimeStamp) {
    return next(new AppError('Applying to this job has expired', 400));
  }
  job.user.forEach((el) => {
    // eslint-disable-next-line eqeqeq
    if (el._id == userId) {
      return next(new AppError('You have applied once', 400));
    }
  });

  job = await Job.findByIdAndUpdate(
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

exports.getJobsWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng) {
    next(new AppError('Please provide the latitude and longitude in the format lat,lng', 400));
  }
  const jobs = await Job.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });
  res.status(200).json({
    status: 'success',
    results: jobs.length,
    data: {
      data: jobs,
    },
  });
});
