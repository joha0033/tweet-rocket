
const Twit = require('twit')
const thisMoment = require('moment')

const consumerKey = process.env.TWITTER_CONSUMER_KEY
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET
console.log('this is updated...');

/*
check db to find tweets that have not been sent
check if sent === false AND schedule_date <= today's date
check if any tweets from list, verified unsent, should be sent today
check if any tweets from list, scheduled for today, should be sent now.
it time is acceptable, send that mofo
*/

const queries = require('../db/queries.js');
const todaysDate = thisMoment().utc().format('YYYY-MM-DD')
const thirtyAgo = () => thisMoment().utc().subtract(30, 'minutes').format('YYYY-MM-DD kk:mm')
const thirtyAhead = () => thisMoment().utc().add(30, 'minutes').format('YYYY-MM-DD kk:mm')

console.log('findme : job file hit.');

const createTwit = async (accessKey, accessSecret) => {
  console.log('ceateTwit called!');

  return new Twit({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token: accessKey,
    access_token_secret: accessSecret,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
  })
}

const thenRelease = ({ id, user_id, tweet }) => {
  console.log('thenRelease called with user_id:', user_id, 'Tweeting:', tweet);

  return queries.getUsersTwitterAuth(user_id).then(([{ twitter_access_token, twitter_access_secret }]) => {
    console.log('queries.getUsersTwitterAuth called');

    return createTwit(twitter_access_token, twitter_access_secret).then(twit =>
      twit.post('statuses/update', { status: tweet }, async (err, data, response) =>
        queries.updateTweetToSent(id, user_id).then(async sent => sent
          ? console.log('hey, maybe there\'s success or something about your tweet?')
          : console.log('maybe there\'s an error?'))))
  })
}


const checkDBForUnsentTweets = async () =>
  queries.getUnsentTweets() // and populate userId data?

const verifyUnsentTweetsByDate = (tweets) => {
  console.log('verifyUnsentTweetsByDate recieves tweets (length XXX)', tweets.length);
  return tweets.filter(tweet => {
    // console.log('this momenent', thisMoment(), ' is same or after', tweet.scheduled_for, '? ', thisMoment().isSameOrAfter(tweet.scheduled_for));
    return thisMoment().isSameOrAfter(new Date(tweet.scheduled_for))
  })
}

const checkAndVerifyTweetDates = () =>
  checkDBForUnsentTweets().then(tweets => {
    console.log(tweets.length, 'checkAndVerifyTweetDates => checkDBForUnsentTweets (length XX)');
    let verifiedUnsentTweets = verifyUnsentTweetsByDate(tweets)
    console.log('verifiedUnsentTweets', verifiedUnsentTweets);
    return verifiedUnsentTweets
  })

const tweetsToSendToday = async () =>
  checkAndVerifyTweetDates().then(tweets => {
    console.log('This evaluates tweet.scheduled_date === todaysDate in tweetsToSendToday (length)', tweets)
    return tweets.filter(tweet => {
      const scheduledForConvertedToUTCDate = thisMoment(tweet.scheduled_for).utc().format('YYYY-MM-DD')
      const scheduleDateMatches = scheduledForConvertedToUTCDate === todaysDate
      console.log('scheduledForConvertedToUTCDate:', scheduledForConvertedToUTCDate, 'is equal to todaysDate:', todaysDate, '?', 'scheduleDateMatches', scheduleDateMatches);
      return scheduleDateMatches
    })
  })

const tweetsToSendNow = async () =>
  tweetsToSendToday().then(tweets => {
    console.log('this evaluates if the time scheduled for is +/-30 minutes');
    console.log('can I move thirty_ functions here?');
    console.log('30 minutes ago:', thirtyAgo());
    console.log('30 minutes ahead:', thirtyAhead());
    return tweets.filter(tweet => {
      // convert scheduled_for to
      console.log('thisMoment(tweet.scheduled_for:', thisMoment(tweet.scheduled_for).utc().format('YYYY-MM-DD kk:mm'), ').isBetween(thirtyAgo(), thirtyAhead()) evaluates to:', thisMoment(thisMoment(tweet.scheduled_for).utc().format('YYYY-MM-DD kk:mm')).isBetween(thirtyAgo(), thirtyAhead()));

      return thisMoment(thisMoment(tweet.scheduled_for).utc().format('YYYY-MM-DD kk:mm'))
        .isBetween(thirtyAgo(), thirtyAhead())
    })
  })

const sendTweetsScheduledForNow = () =>
  tweetsToSendNow().then((tweets) => {
    console.log('The tweets that made the cut!\nInside sendTweetsScheduledForNow:', tweets);

    tweets.map(tweet =>
      thenRelease(tweet))
  })

sendTweetsScheduledForNow()

module.exports = {
  sendTweetsScheduledForNow
}


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