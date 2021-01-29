const express = require('express');
const jobController = require('../controller/jobController');
const authController = require('../controller/authController');

const router = express.Router();
router
  .route('/')
  .get(jobController.getAllJobs)
  .post(authController.protect, authController.restrictTo('employer'), jobController.createJob);

router.patch('/applyJob/:jobId', authController.protect, authController.restrictTo('user'), jobController.applyJob);

router.route('/:jobId').get(jobController.getJob).delete(jobController.deleteJob).patch(jobController.updateJob);

module.exports = router;
