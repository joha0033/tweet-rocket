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
        res.text.should.be.a('string')
        res.text.should.equal('respond with a resource');
        done();
      });
  });
});