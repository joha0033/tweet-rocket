const knex = require('./connection')

module.exports = {
  createPerson(user) {
    return knex('users').insert(user).returning('*');
  },
  getUserById(userId) {
    return knex('users').where('id', userId).first();
  },
  getUserByTwitterId(twitterId) {
    return knex('users').where('twitter_id', twitterId).first();
  },
  updateUserAccessTokenAndSecret(twitterId, token, secret) {
    return knex('users')
    .where('twitter_id', twitterId)
    .update({
      twitter_access_token: token,
      twitter_access_secret: secret,
    })
    .returning('*');
  },
  saveTweet(tweet) {
    tweet = {
      ...tweet,
      scheduled_for: tweet.scheduled_date + " " + tweet.scheduled_time
    }
    return knex('tweets').insert(tweet).returning('*');
  },
  getUnsentTweets() {
    return knex('tweets')
    .where('sent', false)
    .returning('*');
  }
}
