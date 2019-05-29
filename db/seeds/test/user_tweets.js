const { users,
  tweets
} = require('../../seedData')

exports.seed = (knex, Promise) =>
  knex('tweets').del()
    .then(() =>
      knex('users').del())
    .then(() =>
      knex('users').insert(users))
    .then(() =>
      knex('users').pluck('id')
        .then((userIds) =>
          knex("tweets").insert(tweets)))