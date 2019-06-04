require('dotenv')

const environment = process.env.NODE_ENV;
console.log(environment, 'connection');

const config = require('../knexfile.js');
const environmentConfig = config[environment];
const knex = require('knex');
const connection = knex(environmentConfig);


module.exports = connection;