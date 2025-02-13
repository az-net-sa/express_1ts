const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('Unauthorized');
    }
    console.log(authHeader); // Bearere token
    const token = authHeader.split(' ')[1];
    console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded ) => {
        if (err) 
            return res.status(403).send('Forbidden');
        req.user = decoded.username;        

    });
}