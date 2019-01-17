var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var specialistRouter = require('./routes/specialists');
var timeslotRouter = require('./routes/timeslots');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/specialists', specialistRouter);
app.use('/api/v1/timeslots/', timeslotRouter);

module.exports = app;
