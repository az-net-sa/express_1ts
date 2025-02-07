const express = require('express');
const path = require('path');
const router = express.Router();
const puzzleController = require('../../controllers/puzzleControllers');

router.route('/')
    .get(puzzleController.getAll);



module.exports = router;