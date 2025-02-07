const express = require('express');
const router = express.Router();
const { handleRegister } = require('../controllers/registerControllers');

router.post('/', handleRegister);

module.exports = router;