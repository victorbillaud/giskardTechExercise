const db = require('../db');

module.exports = {
    // List all availabilities
    getAvailabilities: (req, res) => {
        try {
            db.query('SELECT * FROM availabilities ORDER BY start', (err, results) => {
                let availabilities = [];
                if (err) {
                    res.status(500).send('Error retrieving availabilities');
                } else {
                    // This loop is converting the date format to a more readable one with regrouping all slots of the same day
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
    // Get one availability
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
    // Split one availability when creating a reservation
    splitOneAvailability: (req, res, next) => {
        try {
            // Begin by retrieving the availability to split
            db.query('SELECT * FROM availabilities WHERE id = ?', [req.body.id], (err, resultSelect) => {
                if (err) throw err;
                try {
                    // Test if the reservation end at the same time as the availability, if yes create a new availability with the same start date as the reservation end
                    if (new Date(req.body.end).getHours() != resultSelect[0].end.getHours()) {
                        db.query('INSERT INTO availabilities (start, end) VALUES (?,?);', [convertDateFormat(req.body.end), convertDateFormat(resultSelect[0].end)], (err, result) => {
                            if (err) throw err;
                            try {
                                // Test if the reservation start at the same time as the availability, if yes update the end date of this availability
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
                        try {
                            // Test if the reservation start at the same time as the availability, if yes update the end date of this availability
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
                    }
                } catch (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
    // Delete one availability
    deleteOneAvailability: (req, res) => {
        try {
            db.query('DELETE FROM availabilities WHERE id = ?;', [req.body.id], (err, result) => {
                if (err) {
                    res.status(500).send('Error deleting availability');
                } else {
                    if (result.affectedRows > 0) {
                        res.status(200).send('Availability deleted successfully');
                    } else {
                        res.status(200).send('Availability not found');
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    },
    // Create one availability
    createOneAvailability: (req, res) => {
        try {
            db.query('INSERT INTO availabilities (start, end) VALUES (?,?);', [convertDateFormat(req.body.start), convertDateFormat(req.body.end)], (err, result) => {
                if (err) {
                    res.status(500).send('Error creating availability');
                } else {
                    if (result.affectedRows > 0) {
                        res.status(200).send('Availability created successfully');
                    } else {
                        res.status(200).send('Availability not created');
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}
// Convert date format to MySQL format
function convertDateFormat(date_to_convert) {
    const date = new Date(date_to_convert)
    date.setHours(date.getHours() + 2);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}