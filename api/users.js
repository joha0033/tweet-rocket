const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login', passport.authenticate('twitter'), (req, res) => {
  try {
    return res.redirect('/profile');
  } catch (err) {
    console.log(err, 'as error.');

  }

})

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/')
  })
})

router.get('/profile', function (req, res) {
  const user = req.user;
  console.log(user)
  return res.render('index', { user, title: "Tweet Rocket!" })
})

router.get('/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {

    return res.redirect('/api/v1/twitter/profile')
  })

module.exports = router
