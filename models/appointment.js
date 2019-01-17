'use strict'

/* Tietokanta-skeema varattavalle ajalle. Sisältää tiedot ajanvarauksen ajankohdasta, statuksesta, asiakkaasta yms. */

var mongoose = require('mongoose');

var appointmentSchema = mongoose.Schema({

   
        uuid         : String,
        startTime    : Date,
        endTime      : Date,
        status       : String,
        visitorName  : String,
        notes        : String
    

});



module.exports = mongoose.model('Appointment', appointmentSchema);