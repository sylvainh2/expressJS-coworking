const express = require('express');
const router = express.Router();
const coworkingsController = require('../controllers/coworkingsController');

router.route('/')
    .get(coworkingsController.getAll)
    .post(coworkingsController.update)

router.route('/:id')
    .get(coworkingsController.getById)
    .put(coworkingsController.addById)
    .delete(coworkingsController.deleteById)

module.exports = router;