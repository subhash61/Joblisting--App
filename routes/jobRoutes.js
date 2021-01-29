const express = require('express');
const jobController = require('../controller/jobController');
const authController = require('../controller/authController');

const router = express.Router();

router.route(`/jobs-within/:distance/center/:latlng/unit/:unit`).get(jobController.getJobsWithin);

router.patch('/applyJob/:jobId', authController.protect, authController.restrictTo('user'), jobController.applyJob);

router.use(authController.protect, authController.restrictTo('employer'));

router.route('/').get(jobController.getAllJobs).post(jobController.createJob);

router.route('/:jobId').get(jobController.getJob).delete(jobController.deleteJob).patch(jobController.updateJob);

module.exports = router;
