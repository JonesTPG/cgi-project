var express = require('express');
var router = express.Router();
var Specialist = require('../models/specialist');
var Appointment = require('../models/appointment')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('Timeslot router');
});

router.get('/free', function(req, res, next) {
    let start = new Date(req.query.from);
    let end = new Date(req.query.to);
    console.log(start + " " + end)
    let specialist = req.query.specialists;

    if (start == undefined || end == undefined) {
        res.json({message: "tarkista url-parametrit."});
        return;
    }
   
    //spesialistia ei ole spesifioitu url-parametrissa
    if (specialist == undefined) {
        Appointment.find({
            startTime: {
                $gte: start,
                $lte: end
            },
            status: "free"
        })
        .lean()
        .exec(function(err, results) {
            res.json(JSON.stringify(results));
        });
    }
    //spesialisti on spesifioitu url-parametrissa
    else {
        Appointment.find({
            startTime: {
                $gte: start,
                $lte: end
            },
            specialistID: specialist,
            status: "free"
        })
        .lean()
        .exec(function(err, results) {
            res.json(JSON.stringify(results));
        });

    }

    
});

// lisää varattavia aikoja asiantuntijalle. 
router.post('/', function(req, res, next) {

    console.log("lisätään varattavissa olevia aikoja asiantuntijalle...");
    console.log(req.body.date + " " + req.body.specialistID);
    let startTime = new Date(req.body.date);
    let endTime = new Date(req.body.date);
    endTime = endTime.setMinutes(endTime.getMinutes() + 20);
    let reqData = {
        specialistID: req.body.specialistID,
        startTime: startTime,
        endTime: endTime,
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
});


//put request, jolla tietyn ajan voi muuttaa varatuksi. käytännössä siis mongossa kenttä "status" muutetaan
//tilasta "free" tilaan "reserved"

router.put('/:id', function(req, res, next) {
    console.log("put request id: " + req.params.id);
    Appointment.findOne({
        _id: req.params.id
    }, function(err, doc) {

        doc.status = "reserved";
        doc.save(function (err) {
            if (err) {
              console.log(err);
            }
            res.json({message: "aika varattu."});
          });

    });
});

//tarkistetaan onko data ok.
let validateData = (data) => {
    let o = {
        specialistID: data.specialistID,
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
