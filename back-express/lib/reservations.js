const db = require('../db');

module.exports = {
    addOneReservations: (req, res, next) => {
        console.log(req.body);
        try {
            db.query('SElECT * FROM availabilities WHERE id = ?', [req.body.id], (err, result) => {
                if (err) throw err;
                if(new Date(result[0].start) <= new Date(req.body.start) && new Date(result[0].end) >= new Date(req.body.end)) {
                    try {
                        db.query('INSERT INTO reservations (email, title, start, end) VALUES (?,?,?,?);',[req.body.email, req.body.title, convertDateFormat(req.body.start), convertDateFormat(req.body.end)], (err, result) => {
                            if (err) throw err;
                            next();
                        });
                    } catch (error) {
                        console.log(error);
                    }
                }
                else  res.status(500).send({state: false, message: 'Reservation not added'});
            });
        } catch (error) {
            console.log(error);
        }
    }
}

function convertDateFormat(date_to_convert){
    const date = new Date(date_to_convert)
    date.setHours(date.getHours() + 2);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}