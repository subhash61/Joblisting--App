const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController');

router.post(`/login`, authController.login);
router.post(`/signup`, authController.signup);
router.get(`/logout`, authController.logout);
router.route('/sendOTP').post(authController.sendOTP);

router.patch(`/updateMe`, userController.updateMe);
router.post('/uploadResume', authController.protect, userController.uploadUserResume);

router.get(`/me`, userController.getMe, userController.getUser);

router.use(authController.restrictTo('admin'));

router.route(`/`).get(userController.getAllUsers);

module.exports = router;
