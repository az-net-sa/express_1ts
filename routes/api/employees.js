const express = require('express');
const path = require('path');
const router = express.Router();
const empsController = require('../../controllers/empControllers');
const verifyJWT = require('../../middleware/verifyJWT');


router.route('/')
    .get(verifyJWT,empsController.getAllEmps)
    .post(verifyJWT,empsController.postEmp);

router.route('/:id')
    .get(empsController.getEmp);

module.exports = router;