# Tweet Rocket

schedule your tweets, with tweet rocket

https://tweet-rocket.appspot.com/

## Setup

Install Node dependencies:

```sh
$ npm install
```

Create the following Postgres databases:

1. tweet_rocket
1. tweet_rocket_test

Apply the DB migrations:

```sh
$ node_modules/.bin/knex migrate:latest --env development
```

Create a *.env* file and add the following variables:

```
TWITTER_CONSUMER_KEY=UPDATE_ME
TWITTER_CONSUMER_SECRET=UPDATE_ME
TWITTER_ACCESS_TOKEN=UPDATE_ME
TWITTER_ACCESS_TOKEN_SECRET=UPDATE_ME
TWITTER_SESSION_SECRET=UPDATE_ME
TWITTER_CALLBACK_URL=http://localhost:3000/api/v1/twitter/callback
```

Run the app:

```sh
$ npm start
```
