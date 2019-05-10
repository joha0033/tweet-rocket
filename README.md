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

**Part I** - Installation, basic server setup, creating tests and routes.

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

```terminal
$ git init
$ git add README.md [this is optional]
$ git commit -m "first commit"
$ git remote add origin https://github.com/joha0033/<your-repo-name>.git
$ git push -u origin master
```

That should create your `.gitignore` file.


### Part I - Testing your Project

### Part I - Setting up your Twitter Login

We need a Twitter Developer Account, go [here](https://developer.twitter.com/en/apply-for-access.html)

Then, Click ( Apply for a developer account ). Process is pretty painless and quick. Describe your app and verify your email.

From your developer profile page, click 'Apps' in the top right corner. Then click 'Create App'. If that button is disabled, hard refresh your browser --[CMD+SHIFT+R].
















