const express = require('express');
const path = require('path');
const router = express.Router();
const leaderboard = require('../../controllers/leaderboardControllers');

router.route('/')
    .get(leaderboard.getAll)
    .post(leaderboard.postNewScore);


router.route('/topten')
    .get(leaderboard.TopTen);
    
module.exports = router;