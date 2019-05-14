## Audience

This is an beginner to intermediate-level tutorial for full-stack developers that have a solid understanding of-

1. Front and Backend Development with JavaScript (Node/Express + _______)
1. Terminal and its commands (I'm using iTerm2)
1. Code Editors (I'm using VSCode)
1. package managers (I'm using npm, and brew to update node)
1. Familiarity with Test Driven Development in JavaScript (I'll be using Mocha + Chai)
1. Authentication and Authorization (Using Passport.js seems to be the standard.)
1. OAuth concepts (Twitter API/OAuth)
1. Testing server endpoints (I use Postman)

## Objectives

By the end of this tutorial, you will be able to:

### Chapter One - Node/Express 

**Part I**
1. Create a Node.js/Express application with public endpoints
<!-- 1. Implement a database with PostgresQL + Knex -->
1. Describe how to test in Node.js/Express
1. Implement Twitter OAuth in Node.js/Express

**Part II**


## Narrative

Building a Fullstack Application 

## Article Type

Tutorial

# CSS Grid - Zero to Hero

## Outline

1. Setting up Node and Express server

## Chapter One

This Chapter we will go over the basics of setting up the server we need for our application. We'll get some tests, github versioning and branches, and deploy to GCP.

**Part I** - Installation, basic server setup, deployment, creating tests and routes.

**Part II** - Setting up your Twitter App OAuth.

**Part III** - Setting up a database with PostgresQL + Knex, testing your database.

### Part I - Installation

**Installation**

When developing, it's best to get familiar with docs. Below are some resources to get you started with Node and Express if you're unfamiliar. They are resources direct from creators. If you need further explanation, StackOverflow and MDN have great resources.

**Node/Express Resources**

- [About Node](https://nodejs.org/en/about/)
- [Installing Node](https://nodejs.org/en/download/package-manager/)
- [Guides on Node](https://nodejs.org/en/docs/guides/)
- [About Express](https://expressjs.com/)
- [Installing Express](https://expressjs.com/en/starter/installing.html)
- [Guides on Express](https://nodejs.org/en/docs/guides/)

**Node/Express Guides**

- [Serverside Rendered Library](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Tutorial_local_library_website)
- [Testing Node and Express](https://mherman.org/blog/testing-node-and-express/)
- [Node, Passport, and Express](https://mherman.org/blog/node-passport-and-postgres/)

Other things I'll be using: Nodemon, Passport, Passport-twitter, express-sessions, GCP, Github

### Part I - Setting Up your Project

To make sure we have an updated version of Node and Express installed, we'll go to our terminal and enter some commands.

Checking the versions of node and express. To find the latest stable version visit the documentations.

```terminal
$ express --version
> #.##.## [version]

$ node --version
> #.##.## [version]
```

If you need to update, there's plenty of resources online. You got this.

Ok we have the latest versions, now lets generate an Express App using the npm's `express-generator`. This will give us a decent boilerplate to work with.

```terminal
$ npm install express-generator -g
```

First, go to a directory in your terminal where you want your project to live. Next, create an App.

```terminal
$ express <app-name-here>
```

I'll name mine, tweet-rocket. I'll create the project, change to that directory, then, test to see if the basics work.

```terminal
$ express tweet-rocket
$ cd tweet-rocket
$ SET DEBUG=tweet-rocket:* & npm start
```

In your browser go to http://localhost:3000/. There you should see the basic Express page.

For an easier development experience I like to use nodemon. It restarts your server when it sees file changes so you don't have to restart it every change.

```terminal
$ npm install --save-dev nodemon
```
To activate it just type `nodemon`

```terminal
$ nodemon
```

Repeat! --> In your browser go to http://localhost:3000/. There you should see the basic Express page.

Go into your App, go into routes, and change 'Express' to something different and see if the changes display on the screen auto-magically. Nice.

Lets setup Github real quick! 

Go to Github.com and create a repository. If you don't have github, sign up... right now.

Make sure you use a `.gitignore` file in your root directory. I like the npm package `gitignore` to generate this.

```terminal
$ npm install gitignore -g
$ gitignore node
```

That should create your `.gitignore` file. Then you can set up your repository.

```terminal
$ git init
$ git add README.md [this is optional]
$ git commit -m "first commit"
$ git remote add origin https://github.com/joha0033/<your-repo-name>.git
$ git push -u origin master
```

Golden. You're so great.

### Part II - Testing your Project

For testing we'll be using Mocha as the testing library and Chai as the assertion library.

Mocha will be installed globally, and chai (plus chai-http for testing HTTP requests) will be a development dependency.


```terminal
$ npm install -g mocha
$ npm install chai chai-http --save-dev 
```

We need a directory/folder to store our tests, so we'll do that and create a simple test file.

*while in your project's root directory... in terminal*

```terminal
$ mkdir test
$ touch ./test/tests.js
```

Now, copy and paste this code into `tests.js`

```javascript
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('/', () => {
  it('should list a status of 200 on /', (done) => {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });
});

// Testing user route, you can have multiple "it" blocks in one "describe"
// You can also have nested "describe" blocks
describe('Users', () => {
  describe('route', () => {
    it('should list a status of 200', (done) => {
      chai.request(server)
        .get('/users')
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
    });
  });


  it('should respond with text "respond with a resource"', (done) => {
    chai.request(server)
      .get('/users')
      .end((err, res) => {
        // want to see what you're testing?
        console.log(res.text, "testing response!")
        res.text.should.be.a('string')
        res.text.should.equal('respond with a resource');
        done();
      });
  });
});
```

Go to your terminal and run mocha!

```terminal
$ mocha
```

You should see something like this... well, exactly like this.

```terminal
  /
GET / 200 226.756 ms - 170
    ✓ should list a status of 200 on / (281ms)

  Users
GET /users 200 1.098 ms - 23
    ✓ should respond with text "respond with a resource"
    route
GET /users 200 0.517 ms - 23
      ✓ should list a status of 200


  3 passing (390ms)
```

Ok, so our basic tests are complete, lets do some deploying.

### Part III - Deploying your Project

We should ahead and deploy so we have a URL for our project. We'll need it for creating a Twitter Developer application. 

Here's where you can access [Google Cloud Platform](https://cloud.google.com/) and create an account if you don't have one.

There's a few small steps once logged into the GCP console to complete to be able to use GCP for deployment.

*You are able to create a project in the command line with the gcloud SDK while you're initializing gcloud for your application. Follow the next steps if you've never used GCP and you'll get a slight feel for the GUI console in the browser.*

1. First we must create a project. 

    - You'll just need a project name. It will take a short few minutes and once its finished up you can click the completed badge and you'll be directed to your app's dashboard.
      - *again you can do this in the console shortly.*

2. Enable App Engine for your project. 
  
    *We will do this through the command line, but this way we get the code we need to enter into the terminal.*

    - You'll see a Hamburger in the top left corner of your console. This will open a side menu. Scroll down and click App Engine under the Compute section and select Dashboard.
    - We're going to deploy through the command line, so get the gcloud SDK. There should be a link in the "Deploy via command line card".
    - Once the SDK is setup we'll initialize the application. 

While you're in your application's root directory, type the following command.

```terminal 
$ gclound init
```

The result should be something like this... with more or less options. 

- Select "Create a new config".
- Choose your account
- Choose the project you just made in the browser in GCP
 - If you didn't make a project, the option to create one here [last option #].

```terminal
Pick configuration to use:
 [1] Re-initialize this configuration [chance-the-trainer-gcp-config] with new settings 
 [2] Create a new configuration
 [3] Switch to and re-initialize existing configuration: [default]
 Please enter your numeric choice: 2

 Enter configuration name. Names start with a lower case letter and 
contain only lower case letters a-z, digits 0-9, and hyphens '-':  tweet-rocket-config
Your current configuration has been set to: [tweet-rocket-config]

Choose the account you would like to use to perform operations for 
this configuration:
 [1] [my email!]@gmail.com
 [2] Log in with a new account
Please enter your numeric choice: 1

You are logged in as: [[me email!]@gmail.com].

Pick cloud project to use: 
 [1] ####-#######
 [2] chance-#########
 [3] tweet-rocket
 [4] Create a new project
 Please enter numeric choice or text value (must exactly match list 
item):  3

Your current project has been set to: [tweet-rocket]. 
```

ok, that was easy... now lets setup an app.yaml file for the deployment configurations. It's very simple.

```terminal
$ echo "runtime:nodejs10" >> app.yaml
```
Done... Great, now lets deploy!

```terminal
$ gcloud app deploy
<!-- blah blah blah... stuff. -->
Do you want to continue (Y/n)?  Y
```

It should do some stuff for a bit and things for a few minutes, then you'll have a URL!

There's a command to open up your project in the browser! You can get the URL there.

```terminal
$ gcloud app browse
```
Holy shit, we're live.

*save the appspot/gcloud URL, we're going to need that in a second. https://<your-app-name>.appspot.com/*

### Part IV - Setting up your Twitter Login

We need a Twitter Developer Account, go [here](https://developer.twitter.com/en/apply-for-access.html)

Then, Click [ Apply for a developer account ]. Process is pretty painless and quick. Describe your app and verify your email.

From your developer profile page, click 'Apps' in the top right corner. Then click 'Create App'. If that button is disabled, hard refresh your browser --[CMD+SHIFT+R]. Once you are redirected, you'll have to go through the form process telling Twitter what you're app is all about. A URL, callback URL, description, and how it will be used is the main information needed. Also, this app *WILL* be used to log into twitter, there's a check box for that.

**Key info**
- The app will be used to log into twitter, there's a checkbox for that.
- Create a description of what the app does
- Create a description of how the app will be used
- App URL: https://<your-app-name>.appspot.com/
- App URL Callback: https://<your-app-name>.appspot.com/twitter/callback

That should do it. There may be extra steps in place since this post, just follow the best you can and get that app going!

When your app is created, go to the Keys and Access Tokens, we'll need those later. 

**DO NOT SHARE THESE || DO NOT PUBLISH THESE || DONT PUSH THEM TO GITHUB**

We'll use a .env file to hide them from the untrustworthy public scouring the inter-webs.

```terminal
$ echo "TWITTER_CONSUMER_KEY=[YOUR APP CONSUMER KEY]\nTWITTER_CONSUMER_SECRET=[YOUR APP CONSUMER SECRET]" >> .env
```

The .env file will be ignored when you push up to Github. Why? Because we tell Github to ignore it in our .gitignore file, go see for yourself.

Next, we will add some dependencies to our application that will allow us to log into twitter within our application.

Dependencies to install:  passport, passport-twitter, express-session, dotenv

```terminal
$ npm install --save passport passport-twitter express-session dotenv
```

This is everything we need to create a basic passport session utilizing twitter credentials. The `passport` package abstracts some complex code like the HTTP request jargon, and `passport-twitter` gives us the ability to use a strategy that is twitter specific. If you wanted, say... Github login you'd use `passport-github` for implement your strategy. `express-sessions` allows for us to create a session for our user in the browser with ease. The `dotenv` dependency allows us to access the .env file variables by appending `process.env.[THE_VARIABLE_NAME]`

Now we need to create a Passport.js Strategy for Twitter. A strategy is simply a way, or method, to login. You can have many strategies like a Facebook Strategy, Google Strategy, and any other major OAuth login providers. To do this, we'll have run the code snippet above to install our dependencies. 

This is where we'll implement our strategy. To do so, lets start adding some code in app.js

Lets use our new dependencies. Add these line to app.js, just after the original dependencies.

```javascript
// passport requirements
require('dotenv').config()
const session = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
```

Right under these dependencies add the following

```javascript
// secret keys for passport
const consumerKey = process.env.TWITTER_CONSUMER_KEY
const consumerSecret = process.env.TWITTER_CONSUMER_SECRET
const callbackURL = process.env.TWITTER_CALLBACK_URL
```
You'll have to add TWITTER_CALLBACK_URL to your .env file. Its your apps URL plus, /twitter/callback, like we used before.

To use passport and the Twitter strategy, add the following after the previous code.

```javascript
// using passport with Twitter Strategy
passport.use(new TwitterStrategy({
  consumerKey,
  consumerSecret,
  callbackURL
}, (token, tokenSecret, profile, done) =>  done(null, profile)))

passport.serializeUser(function(user, callback){
  callback(null, user);
});
passport.deserializeUser(function(object, callback){
  callback(null, object);
});
```

directly under that code, use this.

```javascript
passport.serializeUser(function (user, callback) {
  callback(null, user);
});
passport.deserializeUser(function (object, callback) {
  callback(null, object);
});
```

To create a session for the user, we'll initialize `express-session` like so. I would add this underneath the existing `app.use()` initializers.

*I've also added SESSION_NAME and TWITTER_SESSION_SECRET to our .env file. they can be whatever you desire! a simple word is fine*

```javascript
// add session cofig
app.use(session({
  name: process.env.SESSION_NAME,
  secret: process.env.TWITTER_SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));
```

Routes are very important, we'd have nothing with out them. Let's add them now underneath the previous code.

```javascript
// add routes
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.render('index', { user: req.user, title: "Tweet Rocket!" });
});

//Add twitter login and return methoods
app.get('/twitter/login', passport.authenticate('twitter'));

app.get('/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/')
  });

app.get('/twitter/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/'); // Inside a callback… bulletproof!
  });
});
```

And that should do us for the login! Now this wont be easy to test locally. In fact, I'm going to skip that. 

Go ahead and run this to see if there's any runtime errors.

```terminal
$ nodemon
```

Make sure everything is running ok.

Now that the routes are there and our code runs without syntax errors, lets add a view for the user. This will be an extremely simple view for now, but we'll spruce it up once the heavy lifting is taken care of.

Go to your views folder in your root directory. Open up `index.jade` and paste the following.

```jade
extends layout

block content
  .container
    .row
       .col-sm-12
          table.table.table-hover
            thead
              tr
                th 
                  h1 #{title}
            tbody
              tr
                td
                   if user
                    strong Welcome: 
                    | #{user.displayName}
                    br 
                    strong Display Photo: 
                    img(src="#{user.photos[0].value}", alt="")
                    a(class ="btn btn-primary" href="/twitter/logout") 
                      | Logout
                   else
                     a(class ="btn btn-primary" href="/twitter/login") 
                      | Login With Twitter
```

Now open up layout.jade in the same directory and add the following

```jade
doctype html
html
  head
    title= title
    link(rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous")

    script(src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous")
    script(src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous")
    script(src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous")
  body
    block content
```

Save your work, test it locally (the Twitter login wont work) and make sure there's no syntax errors.

Now lets deploy and login in with some twitter credentials!

```terminal
$ gcloud app deploy
...stuff happens, it'll ask a question, select Y

$ gcloud app browse
```

We should be live and logging in! If everything works, we should go ahead and push it up to github

```terminal
$ git add ./app.js
$ git commit -m "basic passport + routes"
$ git push origin master
``` 

Next we'll style our frontend, add some test to go red, then add functionality to go green.


























