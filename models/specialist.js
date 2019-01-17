'use strict'

/* Tietokanta-skeema asiantuntijalle. */

var mongoose = require('mongoose');

var specialistSchema = mongoose.Schema({

   
        firstname    : String,
        lastname     : String,
        uid          : String,
        role         : String,
        created      : Date
    

});



module.exports = mongoose.model('Specialist', specialistSchema);