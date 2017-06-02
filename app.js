require('dotenv').load();

var express = require('express');
var app = express();
var methodOverride = require('method-override');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var userRoutes = require('./routes/users-routes');
var taskRoutes = require('./routes/tasks-routes');
var listRoutes = require('./routes/lists-routes');
var session = require('cookie-session');
var fs = require('fs');
var flash = require('connect-flash');
var passport = require('passport');

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({secret:process.env.SECRET_KEY}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', function(req,res) {
	res.redirect('/users/login');
});

app.use('/users', userRoutes);
app.use('/users/:user_id/lists', listRoutes);
app.use('/users/:user_id/lists/:list_id/tasks', taskRoutes);

// send flash messages to all routes
app.use(function(req, res, next) {
  res.locals.message = req.flash('message');
  next();
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(process.env.PORT || 3000);