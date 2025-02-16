// imports
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('member API service', function() {
    // get all
    it('should GET all members', function (done) {
        chai
        .request('http://localhost:3000')
        .get('/api/members')
        .end(function (err, resp) {
          expect(resp.status).to.be.eql(200);
          expect(resp.body).to.be.a('array');
          expect(resp.body.length).to.not.be.eql(0);
          done();
        });
    });

    // get one (by name)
    it('should GET a single member', function (done) {
        const expected = {name: "admin"} ;
    
        chai
          .request('http://localhost:3000')
          .get('/api/member/get:name')
          .end(function (err, resp) {
            expect(resp.status).to.be.eql(200);
            expect(resp.body).to.be.a('array');
            expect(resp.body.length).to.not.be.eql(0);
            expect(resp.body.name).to.be.eql(expected.name);
            done();
          });
      }); 

     // create
    it.skip('should POST a single member', function (done) {
        const testMember = { name: 'testMember' };
        const expected = { message: 'testMember successfully added' };
    
        chai
          .request('http://localhost:3000')
          .post('/api/member/new')
          .send(testMember)
          .end(function (err, resp) {
            expect(resp.status).to.be.eql(200);
            expect(resp.body).to.be.eql(expected);
            done();
          });
      }); 

});