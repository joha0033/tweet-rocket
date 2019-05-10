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

1. First we must create a project. 

    - You'll just need a project name. It will take a short few minutes and once its finished up you can click the completed badge and you'll be directed to your app's dashboard.

2. Enable App Engine for your project. 
  
    *We will do this through the command line, but this way we get the code we need to enter into the terminal.*

    - You'll see a Hamburger in the top left corner of your console. This will open a side menu. Scroll down and click App Engine under the Compute section and select Dashboard.
    - We're going to deploy through the command line, so get the gcloud SDK. There should be a link in the "Deploy via command line card".
    - once the SDK is setup we'll initialize the application. 

```terminal 
$ gclound init
```

You should see something like this... with more or less option. Select "Create a new config".

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
 Please enter numeric choice or text value (must exactly match list 
item):  3

Your current project has been set to: [tweet-rocket]. 
```

ok, that was easy... now lets setup an app.yaml file for the deployment configurations. It's very simple.

```terminal
$ echo "runtime:nodejs10" >> app.yaml
```

Great, now lets deploy!

```terminal
$ gcloud app deploy
<!-- blah blah blah... -->
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

Then, Click ( Apply for a developer account ). Process is pretty painless and quick. Describe your app and verify your email.

From your developer profile page, click 'Apps' in the top right corner. Then click 'Create App'. If that button is disabled, hard refresh your browser --[CMD+SHIFT+R]. You'll need to go through the process telling Tweitter what you're app is all about. A URL, callback URL, description, and how it will be used is the main information needed. Also, this app *WILL* be used to log into twitter, there's a check box for that.

**Key info**
- The app will be used to log into twitter
- description of what the app does
- description of how the app will be used
- App URL: https://<your-app-name>.appspot.com/
- App URL Callback: https://<your-app-name>.appspot.com/twitter/callback

That should do it. There may be extra steps in place since this post, just follow the best you can and get that app going!

Next, we will 
















