var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var broken = false;

var indexRouter = require('./routes/index');
var trainsRouter = require('./routes/trains');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
   res.locals = {
     broken: broken
   };
   next();
});

app.use('/', indexRouter);
app.use('/trains', trainsRouter);

//this endpoint performs cpu-intensive calculations
app.get('/generate-cpu-load', function(req, res, next) {
  var val = 0.0001
  for (i = 0; i < 1000000; i++) {
    val += Math.sqrt(val);
  }
  res.status(200).send('Doing a bunch of calculations!')
});

//this endpoint triggers the app to simulate entering an unhealthy state by causing it to return 5XX errors.
app.get('/break', function(req, res, next) {
	broken = true;
	res.status(200).send('The app is now broken!')
});

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
