const express = require('express');
const authController = require('../controller/authController');

const router = express.Router();

const viewController = require('../controller/viewController');

router.get('/', viewController.login);

router.get('/user', authController.protect, authController.restrictTo('user'), viewController.renderUser);

router.get('/employer', authController.protect, authController.restrictTo('employer'), viewController.renderEmployer);

router.get('/user/profile', authController.protect, viewController.renderProfile);

// router.get('employer/profile', viewController.renderEmployerProfile);

module.exports = router;
