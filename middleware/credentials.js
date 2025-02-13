const whitelist = require('../config/whitelist');

const credentials = (req, res, next) => {
    const origin = req.get.origin;
    if (whitelist.indexOf(origin) !== -1 || !origin) {
        res.header('Access-Control-Allow-Credentials', true);
        next();
    } else {
        res.status(403).json({ msg: 'Not allowed by CORS' });
    }
};

module.exports = credentials;