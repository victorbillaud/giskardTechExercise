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
                        const date = new Date(result.start).toDateString();
                        if (availabilities.find(x => x.day === date)){
                            availabilities[availabilities.findIndex(x => x.day === date)].slots.push(
                                {
                                    id: result.id,
                                    start: result.start,
                                    end: result.end
                                }
                            );
                        }else{
                            availabilities.push({
                                day: new Date(result.start).toDateString(),
                                slots : [
                                    {
                                        id: result.id,
                                        start: result.start,
                                        end: result.end
                                    }
                                ]
                            });
                        }
                    });
                    res.status(200).json(availabilities);
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
    getOneAvailability: (req, res) => {
        try {
            db.query('SELECT * FROM availabilities WHERE id = ?', [req.query.id], (err, results) => {
                if (err) {
                    res.status(500).send('Error retrieving availability');
                } else {
                    res.status(200).json(results[0]);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}