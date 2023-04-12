const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
router.route('/')
    .get(usersController.findAll);

router.route('/:id')
    .get(usersController.findByPk);

router.route('/login')
    .post(authController.login);

router.route('/signup')
    .post(authController.signup);

module.exports = router;