const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

//Import routes
const {
    AVAILABILITIES,
    AVAILABILITY,
    CREATE_AVAILABILITY,
    DELETE_AVAILABILITY,
    RESERVATIONS,
    CREATE_RESERVATION,
    DELETE_RESERVATION
} = require('./routes.js');

//Import controllers
const availabilitiesServices = require('./lib/availabilities.js');
const reservationsServices = require('./lib/reservations.js');

// Init app
const app = express();
app.use(express.urlencoded({ extended: false }));   
app.use(express.json());
app.use(fileUpload())
app.use(express.static(__dirname + '/public'));
app.use(cors())

// Routes
app.get(AVAILABILITIES, availabilitiesServices.getAvailabilities);
app.get(AVAILABILITY, availabilitiesServices.getOneAvailability);
app.post(CREATE_AVAILABILITY, availabilitiesServices.createOneAvailability);
app.post(DELETE_AVAILABILITY, availabilitiesServices.deleteOneAvailability);
app.post(CREATE_RESERVATION, reservationsServices.addOneReservations, availabilitiesServices.splitOneAvailability);
app.post(DELETE_RESERVATION, reservationsServices.deleteOneReservations);
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})