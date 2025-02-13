const fsPromises = require('fs').promises;
const path = require('path');

const usersDB = {
    users: require('../model/users.json'),
    setUsers: function(data) {
        this.users = data;
    }
};


const handleLogout = async (req, res) => {
    // on front end, delete the cookies

    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }

    const refreshToken = cookies.jwt;


    // find the user with the refreshToken
    const user = usersDB.users.find(person => person.refreshToken === refreshToken);
    if (!user) {
        res.clearCookie('jwt' , { httpOnly: true , sameSite: 'None' , secure:true });
        return res.sendStatus(204); // Forbidden
    } 

    // remove the refreshToken from the user
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== user.refreshToken);
    const currentUser = { ...user, refreshToken: '' };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(path.join(__dirname, '..' , 'model' , 'users.json'), 
    JSON.stringify(usersDB.users, null, 2));

    res.clearCookie('jwt' , { httpOnly: true , sameSite: 'None' , secure:true });
    res.sendStatus(204);
};


module.exports = { handleLogout };