const data = require('../public/puzzle/sources/en.json');


const getAll = (req, res) => {
    res.json(data);
}

module.exports = { getAll };