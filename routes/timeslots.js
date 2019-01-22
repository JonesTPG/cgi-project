var express = require('express');
var router = express.Router();
var Specialist = require('../models/specialist');
var Appointment = require('../models/appointment')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('Timeslot router');
});

// lisää varattavia aikoja asiantuntijalle. 
router.post('/', function(req, res, next) {

    console.log("lisätään varattavissa olevia aikoja asiantuntijalle...");
    let reqData = {
        specialistID: req.body.specialistID,
        date: req.body.day,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        status: "free",
        visitorName: "unknown",
        notes: "nothing"
    }
    
    //validoitaan data. ajansäästön vuoksi kovin ihmeellisiä validointeja ei tehdä.
    if ( validateData(reqData) == -1 ) {
        res.json({message: "ajan lisääminen ei onnistunut."});
        return;
    }
    
    
    //tallennetaan varattu aika sekä spesialist että appointment-kokoelmaan
    saveAppointment(reqData);
    saveAppointmentToSpecialist(reqData);
    res.json({message: "ajat lisätty."});
        
})


//tarkistetaan onko data ok.
let validateData = (data) => {
    let o = {
        specialistID: data.specialistID,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        status: data.status,
        visitorName: data.visitorName,
        notes: data.notes
    }

    for (let key in o) {
        if (o[key] == null) {
            return -1;
        }
    }

    return 1;
}


let saveAppointment = (data) => {
    var newAp = new Appointment();
    newAp.specialistID = data.specialistID;
    newAp.startTime = data.startTime;
    newAp.endTime = data.endTime;
    newAp.date = data.date;
    newAp.status = data.status;
    newAp.visitorName = data.visitorName;
    newAp.notes = data.notes;

    newAp.save(function(err) {
        if (err) {
            throw err;
        }

        console.log("saved");
    })

}

let saveAppointmentToSpecialist = (data) => {
    
    let newAppointment = {
        specialistID: data.specialistID,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        status: data.status,
        visitorName: data.visitorName,
        notes: data.notes
    }

    Specialist.findOne({_id: data.specialistID}, function(err, doc) {

        if (err) {
            throw err;
        }

        doc.timeslots.push(newAppointment);

        doc.save(function (err) {
            if (err) {
              console.log(err);
            }
      
          });

    });
}



module.exports = router;
