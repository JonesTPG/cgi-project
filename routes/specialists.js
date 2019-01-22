var express = require('express');
var router = express.Router();

var Specialist = require('../models/specialist')

//palauttaa kaikki kannasta löytyvät spesialistit.
router.get('/all', function(req, res, next) {
  Specialist.find({})
    .lean()
    .exec(function(err, results) {
      res.json(JSON.stringify(results));
    }); 
});

//route, joka luo uuden asiantuntijan tietokantaan
router.post('/', function(req, res, next) {
  console.log("luodaan uusi asiantuntija...");

  //otetaan tiedot request-bodysta talteen
  let firstname = req.body.firstname;
  let lastname  = req.body.lastname;
  let role      = req.body.role;
  let created   = new Date();

  //tarkistetaan datan oikeellisuus

  if (firstname == null || lastname == null || role == null) {
    res.json( { message: "spesialistia ei voitu tallentaa." })
    return;
  }

  //määritellään uusi asiantuntija-objekti ja tallennetaan se

  let specialist = new Specialist();
  specialist.firstname = firstname;
  specialist.lastname = lastname;
  specialist.role = role;
  specialist.created = created;
  specialist.timeslots = [];

  specialist.save(function(err) {
    if (err) {
      res.json( { message: "spesialistia ei voitu tallentaa." })
      throw err; 
    }

    res.json( { message: "spesialisti tallennettu."} )
  })

});

module.exports = router;
