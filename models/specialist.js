'use strict'

/* Tietokanta-skeema asiantuntijalle. */

var mongoose = require('mongoose');

var specialistSchema = mongoose.Schema({

   
        firstname    : String,
        lastname     : String,
        role         : String,
        created      : Date,
        timeslots    : []
    

});



module.exports = mongoose.model('Specialist', specialistSchema);