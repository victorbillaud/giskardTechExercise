const express = require('express');
const cors = require('cors');

require('dotenv').config();

const {
    AVAILABILITIES,
    AVAILABILITY,
    CREATE_AVAILABILITY,
    DELETE_AVAILABILITY,
    RESERVATIONS,
    CREATE_RESERVATION,
    DELETE_RESERVATION
} = require('./routes.js');

const availabilitiesServices = require('./lib/availabilities.js');
const reservationsServices = require('./lib/reservations.js');

const app = express();
app.use(express.urlencoded({ extended: false }));   
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(cors())

app.get(AVAILABILITIES, availabilitiesServices.getAvailabilities);
app.get(AVAILABILITY, availabilitiesServices.getOneAvailability);
app.post(CREATE_RESERVATION, reservationsServices.addOneReservations);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})