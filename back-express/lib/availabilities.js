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
                        if (availabilities.find(x => x.day === date)) {
                            availabilities[availabilities.findIndex(x => x.day === date)].slots.push(
                                {
                                    id: result.id,
                                    start: result.start,
                                    end: result.end
                                }
                            );
                        } else {
                            availabilities.push({
                                day: new Date(result.start).toDateString(),
                                slots: [
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
    },
    splitOneAvailability: (req, res, next) => {
        try {
            db.query('SELECT * FROM availabilities WHERE id = ?', [req.body.id], (err, resultSelect) => {
                if (err) throw err;
                try {
                    if (new Date(req.body.end).getHours() != resultSelect[0].end.getHours()) {
                        db.query('INSERT INTO availabilities (start, end) VALUES (?,?);', [convertDateFormat(req.body.end), convertDateFormat(resultSelect[0].end)], (err, result) => {
                            if (err) throw err;
                            try {
                                if (new Date(req.body.start).getHours() != resultSelect[0].start.getHours()) {
                                    db.query('UPDATE availabilities SET end = ? WHERE id = ?;', [convertDateFormat(req.body.start), req.body.id], (err, result) => {
                                        if (err) throw err;
                                        res.status(200).send({ state: true, message: 'Reservation added successfully' });
                                    });
                                } else {
                                    db.query('DELETE FROM availabilities WHERE id = ?;', [req.body.id], (err, result) => {
                                        if (err) throw err;
                                        res.status(200).send({ state: true, message: 'Reservation added successfully' });
                                    });
                                }
                            } catch (error) {
                                console.log(error);
                            }
                        });
                    } else {
                        db.query('DELETE FROM availabilities WHERE id = ?;', [req.body.id], (err, result) => {
                            if (err) throw err;
                            res.status(200).send({ state: true, message: 'Reservation added successfully' });
                        });
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

function convertDateFormat(date_to_convert) {
    const date = new Date(date_to_convert)
    date.setHours(date.getHours() + 2);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}