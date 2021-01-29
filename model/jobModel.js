const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'job  must have a title'],
  },
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  companyName: {
    type: String,
    trim: true,
    required: [true, 'job must have company name'],
  },
  description: {
    type: String,
    trim: true,
  },
  expireDate: {
    type: Date,
    default: Date.now(),
  },

  // locations: [
  //   {
  //     type: {
  //       type: String,
  //       default: 'Point',
  //       enum: ['Point'],
  //     },
  //     coordinates: [Number],
  //     address: String,
  //     description: String,
  //   },
  // ],
});
jobSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email',
  });
  next();
});
const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
