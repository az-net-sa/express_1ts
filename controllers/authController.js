const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

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
            res.status(200).send('Login successful');
        } else {
            res.status(401).send('Invalid password');
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = { handleLogin };