const express = require('express');
// const authController = require('../controller/authController');

const router = express.Router();

const viewController = require('../controller/viewController');

router.get('/login', viewController.login);

module.exports = router;
