/**
* ghook
* 
* Simple Github web hook server that performs various operations
* upon receiving notifications from Github repositories.
*
* Author: ferenc.szekely@gmail.com
* License: MIT
*
* Copyright (c) 2019 Ferenc Székely
*/
let path = require('path');
let logger = require('morgan');
let express = require('express');
let createError = require('http-errors');
let cookieParser = require('cookie-parser');
let config = require('./config/ghook.config');

let indexRouter = require('./routes/index');

let app = express();
app.config = config;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
