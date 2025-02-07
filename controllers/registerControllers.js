const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = data;
    }
};

const handleRegister = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    // Check if user already exists
    const userExists = usersDB.users.find(person => person.username === username);
    if (userExists) {
        return res.status(400).send('Username already exists');
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user object with correct keys
        const newUser = { "username": username, "password": hashedPassword };

        // Update the users array
        usersDB.users.push(newUser);

        // Save updated users to file
        await fsPromises.writeFile(
            path.join(__dirname, '../model/users.json'),
            JSON.stringify(usersDB.users, null, 2)
        );

        res.status(201).send('User created');

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { handleRegister };