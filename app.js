const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// passport requirements
require('dotenv').config()
const session = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;

// initialize app
const app = express();

// secret keys for passport
const consumerKey = process.env.TWITTER_CONSUMER_KEY
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET
const callbackURL = process.env.TWITTER_CALLBACK_URL

// using passport with Twitter Strategy
passport.use(new TwitterStrategy({
  consumerKey,
  consumerSecret,
  callbackURL
}, (token, tokenSecret, profile, done) => done(null, profile)))

passport.serializeUser(function (user, callback) {
  callback(null, user);
});
passport.deserializeUser(function (object, callback) {
  callback(null, object);
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// add session cofig
app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.TWITTER_SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

// add routes
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.render('index', { user: req.user, title: "Tweet Rocket!" });
});

// add twitter login and return methoods
app.get('/twitter/login', passport.authenticate('twitter'));

app.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/')
  });

app.get('/twitter/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/'); // inside a callback… bulletproof!
  });
});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
