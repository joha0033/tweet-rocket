const express = require('express')
const router = express.Router()
const queries = require('../db/queries.js')
const passport = require('passport')

router.get('/login', passport.authenticate('twitter'))

router.get('/logout', function (req, res) {
  // req.session.destroy(function (err) {
  res.redirect('/')
  // })
})

router.get('/profile', function (req, res) {
  let user
  req.user
    ? user = req.user
    : user = {
      id: 001,
      username: 'austin',
      provider: 'tweeter',
      displayName: "Developer Name",
      admin: false
    }

  return queries.getUserById(user.id).then((isUser) => {
    isUser
      ? res.render('index', { user, title: "Tweet Rocket!" })
      : queries.createPerson(user).then(result => {
        return user
      }).then((user) => {
        queries.getUserById(user.id).then((user) => {
          res.render('index', { user, title: "Tweet Rocket!" })
        })
      })
  })
})

router.get('/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
    res.redirect('api/v1/profile')
  })

module.exports = router