global.Promise = require('bluebird');
global.appConfig = require('./config/appConfig');
global.object = require('./helpers/object');

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

const BootstrapService = require('./services/BootstrapService');

BootstrapService.init().then(()=>null);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const _path = path.join(__dirname, 'public');
app.use('/static',express.static(_path));

// attach routes to app  
const routes = require('./config/routes');
routes.forEach(route => app.use(route.path, route.handler));

// set env to app
app.set('env', require('./config/env').env);

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
  res.render('error',{err});
});

module.exports = app;
