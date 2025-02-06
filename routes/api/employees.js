const express = require('express');
const path = require('path');
const router = express.Router();
const empsController = require('../../controllers/empControllers');

router.route('/')
    .get(empsController.getAllEmps)
    .post(empsController.postEmp);

router.route('/:id')
    .get(empsController.getEmp);

module.exports = router;