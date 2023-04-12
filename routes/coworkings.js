const express = require('express');
const router = express.Router();
const coworkingsController = require('../controllers/coworkingsController');
const authController = require('../controllers/authController');

router.route('/')
    .get(coworkingsController.findAll)
    .post(authController.protect,coworkingsController.createCoworking)

router.route('/:id')
    .get(coworkingsController.findCoworkingByPk)
    .put(authController.protect, coworkingsController.updateById)
    .delete(authController.protect, authController.restrictTo('admin'), coworkingsController.deleteById)

module.exports = router;