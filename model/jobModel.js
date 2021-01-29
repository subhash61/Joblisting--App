const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'User must have a name'],
  },
  description: {
    type: String,
    trim: true,
  },
  expiryDate: {
    type: Date,
    default: Date.now(),
  },
  locations: [
    {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
  ],
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
