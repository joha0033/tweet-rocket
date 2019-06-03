
const Twit = require('twit')
const thisMoment = require('moment')

const consumerKey = process.env.TWITTER_CONSUMER_KEY
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET

/*
check db to find tweets that have not been sent
check if sent === false AND schedule_date <= today's date
check if any tweets from list, verified unsent, should be sent today
check if any tweets from list, scheduled for today, should be sent now.
it time is acceptable, send that mofo
*/

const queries = require('../db/queries.js');
const todaysDate = thisMoment().format('YYYY-MM-DD')
const timeNow = () => thisMoment().format('kk:mm')

const createTwit = async (accessKey, accessSecret) => new Twit({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token: accessKey,
  access_token_secret: accessSecret,
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.
})

const thenRelease = ({ id, user_id, tweet, token, secret }) =>
  createTwit.then(twit =>
    twit.post('statuses/update', { status: tweet }, async (err, data, response) =>
      queries.updateTweetToSent(id, user_id).then(async sent => sent
        ? console.log('maybe there\'s success?')
        : console.log('maybe there\'s an error?'))))

const checkDBForUnsentTweets = async () =>
  queries.getUnsentTweets()

const verifyUnsentTweetsByDate = async (tweets) =>
  tweets.filter(tweet =>
    thisMoment().isSameOrBefore(tweet.scheduled_for))

const checkAndVerifyTweetDates = async () =>
  checkDBForUnsentTweets()
    .then((tweets) =>
      verifyUnsentTweetsByDate(tweets))

const tweetsToSendToday = async () =>
  checkAndVerifyTweetDates()
    .then(tweets => tweets.filter(tweet =>
      tweet.scheduled_date === todaysDate))

const tweetsToSendNow = async () =>
  tweetsToSendToday()
    .then(tweets => tweets.filter(tweet =>
      tweet.scheduled_time === timeNow))

const sendTweetsScheduledForNow = async (tweetsToSendNow) =>
  await tweetsToSendNow()
    .then(tweet => thenRelease(tweet))

// function createTwitObject(accessKey, accessSecret) {
//   return new Twit({
//     consumer_key: consumerKey,
//     consumer_secret: consumerSecret,
//     access_token: accessKey,
//     access_token_secret: accessSecret,
//     timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
//     strictSSL: true,     // optional - requires SSL certificates to be valid.
//   })
// }

// const thenRelease = ({ id, user_id, tweet, token, secret }) => {
//   const T = createTwitObject(token, secret);
//   return T.post('statuses/update', { status: tweet }, function (err, data, response) {
//     // get into DB and check off sent to true!
//     // tweet should have id
//     queries.updateTweetToSent()
//     // handle errors
//     // console.log(data, 'data')
//     // return data
//     // console.log(response, 'response')
//     // console.log(err, 'err')
//   })
// }

  // .then((tweetsToSend) => {
  //   tweetsToSend.map((tweet) => {
  //     const fakeTweetData = {
  //       id: 1,
  //       user_id: 1,
  //       tweet: 'Don\'t forget to eat your tweeties! ',
  //       scheduled_time: '21:00',
  //       scheduled_date: '2019-05-30', // YYYY MM DD
  //       scheduled_for: '2019-05-30 21:00',
  //       sent: false,
  //       created_at: '2019 - 05 - 30T22: 56: 18.237Z'
  //     }
  //   })
  // })
  // .catch((err) => {
  //   console.log(err);
  // });

  // const getApplicableTweets = (tweets) => {
//   return new Promise((resolve, reject) => {
//     const tweetsToSend = tweets.filter((tweet) => {
//       // is scheduled_for < current time
//       const sendDate = tweet.scheduled_for;
//       return thisMoment().isSameOrBefore(sendDate);
//     });
//     resolve(tweetsToSend);
//   });
// }
// https://devcenter.heroku.com/articles/scheduler