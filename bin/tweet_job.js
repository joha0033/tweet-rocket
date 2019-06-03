
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



/*
check db to find tweets that have not been sent
if not sent, verify time
it time is acceptable, send that mofo
*/

const queries = require('../db/queries.js');

function getApplicableTweets(tweets) {
  return new Promise((resolve, reject) => {
    const tweetsToSend = tweets.filter((tweet) => {
      // is scheduled_for < current time
      const sendDate = tweet.scheduled_for;
      return moment().isSameOrBefore(sendDate);
    });
    resolve(tweetsToSend);
  });
}

return queries.getUnsentTweets()
.then((tweets) => {
  return getApplicableTweets(tweets)
})
.then((tweetsToSend) => {
  tweetsToSend.map((tweet) => {



    { id: 1,
      user_id: 1,
      tweet: 'dssdsddssd',
      scheduled_time: '21:00',
      scheduled_date: '2019-05-30',
      scheduled_for: '2019-05-30 21:00',
      sent: false,
      created_at: 2019-05-30T22:56:18.237Z }
  })
})
.catch((err) => {
  console.log(err);
});


// https://devcenter.heroku.com/articles/scheduler
