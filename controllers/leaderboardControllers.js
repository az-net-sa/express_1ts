const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../model/leaderboard.json');
let data = require(filePath);

const getAll = (req, res) => {
    res.json(data);
};

const postNewScore = (req, res) => {
    const NewScore = {
        name: req.body.name,
        score: req.body.score
    };

    if (!NewScore.name || NewScore.score === undefined) {
        return res.status(400).json({ msg: 'Please include a name and a score' });
    }

    // Add the new score to the leaderboard
    data.push(NewScore);

    // Save the updated leaderboard back to the JSON file
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ msg: 'Failed to save score' });
        }
        res.json({ msg: 'Score added successfully', leaderboard: data });
    });
};

module.exports = { getAll, postNewScore };
