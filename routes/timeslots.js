var express = require('express');
var router = express.Router();
var Specialist = require('../models/specialist');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json('Timeslot router');
});

// lisää varattavia aikoja asiantuntijalle
router.post('/', function(req, res, next) {

    console.log("lisätään varattavissa olevia aikoja asiantuntijalle...");
    let specialistID = req.body.specialistID;
    let day = req.body.day;
    let startTime = req.body.startTime;
    let endTime = req.body.endTime;

    if ( specialistID == null || day == null || startTime == null || endTime == null ) {
        res.json( { message: "uusia aikoja ei voitu tallentaa." })
        return;
    }

    console.log(day + " " + startTime + " " + endTime);
    
    
    Specialist.findOne({_id: specialistID}, function(err, doc) {

        if (err) {
            res.json({message: "valittua spesialistia ei löytynyt"});
            return;
        }
        doc.firstname = "Markku";
        doc.save(function (err) {
            if (err) {
              console.log(err);
            }
      
            res.json({message: "ajat lisätty."});
          });

       
    })
        
            

})

module.exports = router;
