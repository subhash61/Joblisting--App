const express = require('express');

const router = express.Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController');

router.post(`/login`, authController.login);
router.post(`/signup`, authController.signup);
router.get(`/logout`, authController.logout);

router.use(authController.protect);
router.patch(`/updateMe`, userController.updateMe);
router.get(`/me`, userController.getMe, userController.getUser);

router.use(authController.restrictTo('admin'));

router.route(`/`).get(userController.getAllUsers);

module.exports = router;
