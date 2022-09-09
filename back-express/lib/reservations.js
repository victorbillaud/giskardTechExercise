const db = require('../db');

module.exports = {
    addOneReservations: (req, res) => {
        console.log(req.body);
        // try {
        //     db.query('INSERT INTO reservations SET ?', req.body, (err, results) => {
        //         if (err) {
        //             res.status(500).send('Error adding registration');
        //         } else {
        //             res.status(200).json(results);
        //         }
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
    }
}