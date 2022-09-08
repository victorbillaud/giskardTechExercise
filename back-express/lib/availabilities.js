const db = require('../db');

module.exports = {
    getAvailabilities: (req, res) => {
        try {
            db.query('SELECT * FROM availabilities ORDER BY start', (err, results) => {
                let availabilities = [];
                if (err) {
                    res.status(500).send('Error retrieving availabilities');
                } else {
                    res.status(200).json(results);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}