const knex = require('./connection')

module.exports = {
  createPerson(user) {
    return knex('users').insert(user).returning('*');
  },
  getUserById(userId) {
    // console.log('getUserById - Q - userId:', userId);

    return knex('users').where('id', userId).first();
  },
  getUserByTwitterId(twitterId) {
    // console.log('getUserByTwitterId - Q - twitterId', twitterId);

    return knex('users').where('twitter_id', twitterId).first();
  },
  updateUserAccessTokenAndSecret(twitterId, token, secret) {
    // console.log('updateUserAccessTokenAndSecret - Q - twitterId, token, secret:', twitterId, token, secret);

    return knex('users')
      .where('twitter_id', twitterId)
      .update({
        twitter_access_token: token,
        twitter_access_secret: secret,
      })
      .returning('*');
  },
  saveTweet(tweet) {
    console.log('saveTweet - Q - tweet:', tweet);
    tweet = {
      ...tweet,
      scheduled_for: tweet.scheduled_date + " " + tweet.scheduled_time
    }
    let savedTweet = knex('tweets').insert(tweet).returning('*');
    return knex('tweets').insert(tweet).returning('*');
  },
  getUnsentTweets() {
    console.log('getUnsentTweets - Q - v2 ');
    return knex('tweets')
      .where('sent', false)
      .returning('*');
  },
  updateTweetToSent(id, user_id) {
    console.log('updateTweetToSent - Q - id, user_id:', id, user_id);
    return knex('tweets')
      .where('id', id)
      .andWhere('user_id', user_id)
      .update({
        sent: true
      })
  },
  getUsersTwitterAuth(user_id) {
    console.log('getUsersTwitterAuth - Q - user_id:', user_id);
    return knex('users')
      .where('id', user_id)
      .returning(['twitter_access_token', 'twitter_access_secret'])
  }
}
