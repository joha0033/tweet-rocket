const express = require('express')
const router = express.Router()
const queries = require('../db/queries.js')
const please = require('node-schedule')
const Twit = require('twit')
const momentTimezone = require('moment-timezone')
const moment = require('moment')

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

const tweetFactory = {
  formatDate: (time, date) => {
    const [hour, minute] = time.split(':')
    const [year, month, day] = date.split('-')
    const theTimeToTweet = `00 ${minute} ${hour} ${day} ${month} ?`
    return theTimeToTweet
  },
  scheduleThis: (tweet, atThisTime, thenRelease) => {
    please.scheduleJob(atThisTime, function () {
      // handle errors?
      console.log('The answer to life scheduling tweets!', tweet)
      return thenRelease(tweet)
    })
  },
  releaseTweet: (tweet) => {
    const consumerKey = process.env.TWITTER_CONSUMER_KEY
    const consumerSecret = process.env.TWITTER_CONSUMER_SECRET
    const accessKey = process.env.TWITTER_ACCESS_TOKEN
    const accessSecret = process.env.TWITTER_ACCESS_TOKEN_SECRET

    const T = new Twit({
      consumer_key: consumerKey,
      consumer_secret: consumerSecret,
      access_token: accessKey,
      access_token_secret: accessSecret,
      timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
      strictSSL: true,     // optional - requires SSL certificates to be valid.
    })

    return T.post('statuses/update', { status: tweet }, function (err, data, response) {
      // handle errors
      // console.log(data, 'data')
      // console.log(response, 'response')
      // console.log(err, 'err')
    })
  }
}

const formatAndSchedule = ({
  scheduled_time,
  scheduled_date,
  tweet
}) => {
  const formattedDate = tweetFactory
    .formatDate(scheduled_time, scheduled_date)

  return tweetFactory
    .scheduleThis(tweet, formattedDate, tweetFactory.releaseTweet)
}

router.post('/schedule', (req, res, next) => {
  const tweetData = req.body
  formatAndSchedule(tweetData)
  return res.redirect('/')
  // queries.scheduleTweet(tweet).then((result, err) => {
  //   if (err) {
  //     console.log(err);
  //     return res.redirect('/api/v1/twitter/profile')
  //   }
  //   const tweetData = result[0]
  //   console.log('tweet saved:', tweetData)
  //   formatAndSchedule(tweetData)
  //   return res.redirect('/api/v1/twitter/profile')
  // })
})

module.exports = router