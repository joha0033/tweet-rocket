const express = require('express')
const router = express.Router()
const queries = require('../db/queries.js')
const passport = require('passport')

router.get('/login', passport.authenticate('twitter'), (req, res) => {
  console.log('login!');

  return res.redirect('/profile')
})

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/')
  })
})

router.get('/profile', function (req, res) {
  let user
  console.log(req.user, 'req.user!?!?');

  req.user
    ? user = req.user
    : user = {
      id: 001,
      username: 'austin',
      provider: 'tweeter',
      displayName: "Developer Name",
      admin: false
    }
  return res.render('index', { user, title: "Tweet Rocket!" })

  // return queries.getUserById(user.id).then((isUser) => {
  //   isUser
  //     ? res.render('index', { user, title: "Tweet Rocket!" })
  //     : queries.createPerson(user).then(result => {
  //       return user
  //     }).then((user) => {
  //       queries.getUserById(user.id).then((user) => {
  //         res.render('index', { user, title: "Tweet Rocket!" })
  //       })
  //     })
  // })
})

router.get('/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
    console.log('callback!');

    return res.redirect('/api/v1/twitter/profile')
  })

module.exports = router