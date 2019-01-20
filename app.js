var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
var specialistRouter = require('./routes/specialists');
var timeslotRouter = require('./routes/timeslots');

var configDB = require('./config/database');

var app = express();

//yhdistetään databaseen
var db = mongoose.connect(configDB.url, { useNewUrlParser: true }, function(error){
    if(error) console.log(error);
  
        console.log("connection successful");
  
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/specialists/', specialistRouter);
app.use('/api/v1/timeslots/', timeslotRouter);

module.exports = app;
