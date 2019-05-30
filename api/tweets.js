const express = require('express')
const router = express.Router()
const queries = require('../db/queries.js')
const please = require('node-schedule')
const CronJob = require('cron').CronJob;
const Twit = require('twit')
const momentTimezone = require('moment-timezone')
const moment = require('moment')

const consumerKey = process.env.TWITTER_CONSUMER_KEY
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET



function createTwitObject(accessKey, accessSecret) {
  return new Twit({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token: accessKey,
    access_token_secret: accessSecret,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
  })
}

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

const thenRelease = (tweet, token, secret) => {
  console.log(tweet, ': in tweetFactory.releaseTweet factory');
  const T = createTwitObject(token, secret);
  return T.post('statuses/update', { status: tweet }, function (err, data, response) {
    // handle errors
    // console.log(data, 'data')
    // return data
    // console.log(response, 'response')
    // console.log(err, 'err')
  })
}

const tweetFactory = {
  formatDate: (time, date) => {
    const [hour, minute] = time.split(':')
    const [year, month, day] = date.split('-')
    const theTimeToTweet = `00 ${minute} ${hour} ${day} ${month} ?`
    console.log(theTimeToTweet, 'theTimeToTweet')
    return theTimeToTweet
  },
  scheduleThis: (status, atThisTime, token, secret) => {
    console.log(status, '<-- status', atThisTime, 'atThisTime in scheduleThis function');
    // new CronJob('* * * * * *', function () {
    //   console.log('You will see this message every day of your life, psyche.');
    // });
    // job.start()
    let scheduled = please.scheduleJob(atThisTime, function () {
      // handle errors?
      console.log('The answer to life scheduling tweets!', status)
      return thenRelease(status, token, secret)
    })
  }
}



const formatAndSchedule = ({
  scheduled_time,
  scheduled_date,
  tweet
}, token, secret) => {
  const formattedDate = tweetFactory
    .formatDate(scheduled_time, scheduled_date)
  console.log(tweet, ': in formatAndSchedule function');
  return tweetFactory
    .scheduleThis(tweet, formattedDate, token, secret)
}

router.post('/schedule', async (req, res, next) => {
  const tweetData = req.body
  console.log(tweetData, ': in post /schedule route');
  await formatAndSchedule(tweetData, req.user.accessToken, req.user.accessSecret)
  return res.redirect('/api/v1/twitter/profile')

  // queries.scheduleTweet(tweet).then(async (result, err) => {
  //   if (err) {
  //     console.log(err);
  //     return res.redirect('/api/v1/twitter/profile')
  //   }
  //   const tweetData = result[0]
  //   console.log('tweet saved:', tweetData)
  //   await formatAndSchedule(tweetData)
  //   return res.redirect('/api/v1/twitter/profile')
  // })
})

module.exports = router
