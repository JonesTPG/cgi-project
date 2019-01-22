'use strict'

/* Tietokanta-skeema varattavalle ajalle. Sisältää tiedot ajanvarauksen ajankohdasta, statuksesta, asiakkaasta yms. */

var mongoose = require('mongoose');

var appointmentSchema = mongoose.Schema({

        specialistID : String,
        startTime    : String,
        endTime      : String,
        date         : String,
        status       : String,
        visitorName  : String,
        notes        : String
    

});



module.exports = mongoose.model('Appointment', appointmentSchema);