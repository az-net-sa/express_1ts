const express = require('express');
const path = require('path');
const router = express.Router();



router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..' , 'views' , 'puzzle' , 'index.html'));
    console.log('subdir index page loaded');
} )

router.get('/leaderboard(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..' , 'views' , 'puzzle' , 'leaderboard.html'));
    console.log('subdir text page loaded');
} )



module.exports = router;