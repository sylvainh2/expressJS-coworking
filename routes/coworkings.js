const express = require('express');
const router = express.Router();
const coworkingsController = require('../controllers/coworkingsController');

router.route('/')
    .get(coworkingsController.findAll)
    .post(coworkingsController.createCoworking)

router.route('/:id')
    .get(coworkingsController.findCoworkingByPk)
    .put(coworkingsController.updateById)
    .delete(coworkingsController.deleteById)

module.exports = router;