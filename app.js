'use strict';

// Require process, so we can mock environment variables.
const process = require('process');
require('dotenv').config()

// express and bs
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')

// middleware
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const Knex = require('knex');

// passport requirements
// const session = require('express-session')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

// query import
const queries = require('./db/queries.js')

// api/routes import
const tweets = require('./api/tweets')
const users = require('./api/users')


// initialize app
const app = express()


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')


// middleware
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// // Set Content-Type for all responses for these routes.
// app.use((req, res, next) => {
//   res.set('Content-Type', 'text/html');
//   next();
// });
// // SETUP LOGGER
// // Create a Winston logger that streams to Stackdriver Logging.
// const winston = require('winston');
// const {LoggingWinston} = require('@google-cloud/logging-winston');
// const loggingWinston = new LoggingWinston();
// const logger = winston.createLogger({
//   level: 'info',
//   transports: [new winston.transports.Console(), loggingWinston],
// });


// add session config
// app.use(session({
//   name: process.env.SESSION_NAME,
//   secret: process.env.TWITTER_SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true,
// }))

// app.use(require('cookie-session')({
//   name: process.env.SESSION_NAME,
//   keys: [process.env.TWITTER_SESSION_SECRET],

//   // Cookie Options
//   maxAge: 72 * 60 * 60 * 1000
// }));

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
  callback(null, user)
})
passport.deserializeUser(function (object, callback) {
  callback(null, object)
})

// initialize passport
app.use(passport.initialize())
app.use(passport.session())


// add routes
app.use('/api/v1/tweets', tweets)
app.use('/api/v1/twitter', users)


app.get('/', function (req, res) {
  process.env.NODE_ENV === 'development' && !req.user
    ? res.render('index', { title: 'Tweet Rocket - development!' })
    : res.render('index', { user: req.user, title: 'Tweet Rocket!!' })
})


// Handle 404
app.use(function (req, res) {
  console.log('404 stat');

  res.status(400)
  res.render('404.jade', { title: '404: File Not Found' })
})

// Handle 500
app.use(function (error, req, res, next) {
  console.log('500 stat', error);
  res.status(500)
  res.render('500.jade', { title: '500: Internal Server Error', error: error })
  next(error)
})

module.exports = app
