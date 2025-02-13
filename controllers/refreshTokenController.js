const jwt = require('jsonwebtoken');
require('dotenv').config();


const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = data;
    }
};

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;
    console.log(`refreshToken: ${refreshToken}`);



    const user = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!user) {
        return res.sendStatus(403); // Forbidden
    } 

    // compare jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || decoded.username !== user.username) 
            return res.sendStatus(403);
        

        const accessToken = jwt.sign({ "username": decoded.username }, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: '30s' });

            res.json({ accessToken });
    }
        );
    };


module.exports = { handleRefreshToken };