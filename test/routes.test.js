const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const knex = require('../db/connection');

chai.use(chaiHttp);

describe('home route "/" should have status: 200', () => {
  it('should list a status of 200 on /', (done) => {
    chai.request(server)
      .get('/')
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });
});