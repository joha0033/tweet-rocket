const express = require('express')
const router = express.Router()
const queries = require('../db/queries.js')


router.post('/schedule', (req, res, next) => {
  console.log(req.body)
  return queries.saveTweet(req.body).then((result, err) => {
    if (err) {
      console.log(err);
      return res.redirect('/api/v1/twitter/profile')
    }
    return res.redirect('/api/v1/twitter/profile')
  })
})

module.exports = router
