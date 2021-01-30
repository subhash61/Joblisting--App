const express = require('express');
// const authController = require('../controller/authController');

const router = express.Router();

const viewController = require('../controller/viewController');

router.get('/login', viewController.login);

router.get('/user', viewController.renderUser);

router.get('/employer', viewController.renderEmployer);

module.exports = router;
