// // Update with your config settings.
require('dotenv');
console.log(process.env.DATABASE_URL, 'knexfile');

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/tweet_rocket',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/tweet_rocket_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },
  production: {
    client: 'pg',
    // The next line is where the application will read that environment variable to connect to the database
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/production',
    },
  },
}
