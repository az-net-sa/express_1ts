const express = require('express');
const path = require('path');
const router = express.Router();



router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..' , 'views' , 'subdir' , 'index.html'));
    console.log('subdir index page loaded');
} )

router.get('/test(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..' , 'views' , 'subdir' , 'test.html'));
    console.log('subdir text page loaded');
} )



module.exports = router;