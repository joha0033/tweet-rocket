const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// Node Schedule Syntax
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// var j = schedule.scheduleJob('42 * * * *', function () {
//   console.log('The answer to life, the universe, and everything!')
// })
// passport requirements
require('dotenv').config()

const session = require('express-session')
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy

// query import
const queries = require('./db/queries.js')

// api/routes import
const tweets = require('./api/tweets')
const users = require('./api/users')

// initialize app
const app = express()

// secret keys for passport
const consumerKey = process.env.TWITTER_CONSUMER_KEY
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET
const callbackURL = process.env.TWITTER_CALLBACK_URL

// using passport with Twitter Strategy
passport.use(new TwitterStrategy({
  consumerKey,
  consumerSecret,
  callbackURL
}, (profile, done) => done(null, profile)))

passport.serializeUser(function (user, callback) {
  callback(null, user)
})
passport.deserializeUser(function (object, callback) {
  callback(null, object)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// add session config
app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.TWITTER_SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}))

// add routes
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1/tweets', tweets)
app.use('/api/v1/twitter', users)

// app.get('/', function (req, res) {
//   res.render('index', { user: req.user, title: "Tweet Rocket!!!" })
// })

// // add twitter login and return methods
// app.get('/twitter/login', passport.authenticate('twitter'))

// app.get('/twitter/callback',
//   passport.authenticate('twitter', { failureRedirect: '/' }),
//   function (req, res) {
//     res.redirect('/')
//   })

// app.get('/twitter/logout', function (req, res) {
//   req.session.destroy(function (err) {
//     res.redirect('/')// inside a callback… bulletproof!
//   })
// })

app.get('/', function (req, res) {
  const user = false
  console.log('get route / in')
  process.env.NODE_ENV === 'development'
    ? res.render('index', { user, title: "Tweet Rocket - development!" })
    : res.render('index', { user: req.user, title: "Tweet Rocket!" })
})

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message
//   res.locals.error = req.app.get('env') === 'development' ? err : {}

//   // render the error page
//   res.status(err.status || 500)
//   res.render('error')
// })

// Handle 404
// app.use(function (req, res) {
//   res.status(400)
//   res.render('404.jade', { title: '404: File Not Found' })
// })

// // Handle 500
// app.use(function (error, req, res, next) {
//   res.status(500)
//   res.render('500.jade', { title: '500: Internal Server Error', error: error })
// })

module.exports = app
