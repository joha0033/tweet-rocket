const knex = require('./connection')

module.exports = {
  createPerson(user) {
    return knex('users').insert(user).returning('*');
  },
  getUserById(userId) {
    return knex('users').where('id', userId).first();
  },
  scheduleTweet(tweet) {
    tweet = {
      ...tweet,
      scheduled_for: tweet.scheduled_date + " " + tweet.scheduled_time
    }
    return knex('tweets').insert(tweet).returning('*');
  }
}