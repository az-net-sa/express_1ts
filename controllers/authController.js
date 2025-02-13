const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = data;
    }
};

const handleLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    // Check if user exists

    const user = usersDB.users.find(person => person.username === username);
    if (!user) {
        return res.status(400).send('Username not found');
    }

    try {
        // Compare the password
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            // login successful
            const accessToken = jwt.sign({ username }, 
                process.env.ACCESS_TOKEN_SECRET, 
                { expiresIn: '30s' });
            // or you can write it like this:
            // const accessToken = jwt.sign(
            //     {"username" : user.username},
            //     process.env.ACCESS_TOKEN_SECRET,
            //     { expiresIn: '30s' }
            // );

            const refreshToken = jwt.sign({ username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' });    
            // or you can also write it as ubove
            
            
            const otherUsers = usersDB.users.filter(person => person.username !== user.username);
            const currentUser = { ...user, refreshToken };
            const updatedUsers = [...otherUsers, currentUser];
            usersDB.setUsers(updatedUsers);
            await fsPromises.writeFile(path.join(__dirname, '..' , 'model' , 'users.json'), JSON.stringify(usersDB.users, null, 2));

            // console.log(accessToken , refreshToken);
           
            res.cookie('jwt', refreshToken, {  httpOnly: true, sameSite: 'None' , secure:true,   maxAge: 24 * 60 * 60 * 1000 /* 1 day */ });
            res.status(200).json({ accessToken});
        } else {
            res.status(401).send('Invalid password');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { handleLogin };