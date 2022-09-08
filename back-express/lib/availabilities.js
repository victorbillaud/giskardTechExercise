const db = require('../db');

module.exports = {
    getAvailabilities: (req, res) => {
        try {
            db.query('SELECT * FROM availabilities ORDER BY start', (err, results) => {
                let availabilities = [];
                if (err) {
                    res.status(500).send('Error retrieving availabilities');
                } else {
                    results.forEach(result => {
                        if (availabilities.find(x => x.day === new Date(result.start).getDay()).foo)
                        availabilities.push({
                            day: new Date(result.start).getDay(),
                            start: result.start,
                            end: result.end
                        });
                    });
                    res.status(200).json(results);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}