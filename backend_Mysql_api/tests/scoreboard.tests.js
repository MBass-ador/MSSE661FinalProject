const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe("scoreboard API service", function () {
    // get all  
    it.skip('should GET all monthly raid data', function (done) {
        chai
        .request('http://localhost:3000')
        .get('/api/scoreboard/')
        .end(function (err, resp) {
        expect(resp.status).to.be.eql(200);
        expect(resp.body).to.be.a('array');
        expect(resp.body.length).to.not.be.eql(0);
        done();
      });
  });

    // get one (by name)
    it.skip("should GET a single member's monthly scores by name", function (done) {
        const expected = {name: "admin"} ;
      
        chai
            .request('http://localhost:3000')
            .get('/api/scoreboard/get/')
            .send(expected)
            .end(function (err, resp) {
            expect(resp.status).to.be.eql(200);
            expect(resp.body).to.be.a('array');
            expect(resp.body.length).to.not.be.eql(0);
            expect(resp.body.name).to.be.eql(expected.name);
            done();
        });
    });

    // create member/row
    it.skip('should POST a single row of member raid data', function (done) {
        const newRow = { name: 'admin' };
        const expected = { message: 'test successfully added' };
    
        chai
          .request('http://localhost:3000')
          .post('/api/scoreboard/new/')
          .send(newRow)
          .end(function (err, resp) {
            expect(resp.status).to.be.eql(200);
            expect(resp.body).to.be.eql(expected);
            done();
          });
      });

    // enter day 1
    it.skip("should PUT day 1 score for member", function (done) {
        const day1 = { name: 'admin', day1: 300 };
        const expected = { message: "member's day1 score set"};

        chai
            .request('http://localhost:3000')
            .put('api/scoreboard/enter/day1/')
            .send(day1)
            end(function (err, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.eql(expected);
                done();
            });
    });

    // enter day 2
    it.skip("should PUT day 2 score for member", function (done) {
        const day2 = { name: 'admin', day2: 300 };
        const expected = { message: "member's day2 score set"};

        chai
            .request('http://localhost:3000')
            .put('api/scoreboard/enter/day2/')
            .send(day2)
            end(function (err, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.eql(expected);
                done();
            });
    });

    // enter day 3
    it.skip("should PUT day 3 score for member", function (done) {
        const day3 = { name: 'admin', day3: 300 };
        const expected = { message: "member's day3 score set"};

        chai
            .request('http://localhost:3000')
            .put('api/scoreboard/enter/day3/')
            .send(day1)
            end(function (err, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.eql(expected);
                done();
            });
    });

    it.skip("should PUT raidTotal for a member", function (done) {
        // make row entry with days 1-3 set
        const calcDummy = { name: "dummy", day1: 100, day2: 100, day3: 100};
        const expected = { message: "monthly raid total calculated and applied"};

        chai
            .request('http://localhost:3000')
            .put('api/scoreboard/enter/day3/')
            .send(calcDummy)
            end(function (err, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.eql(expected);
                done();
            });
    });

    it.skip("should PUT updated member raid data", function (done) {
        // row object with new details
        const updatedRow = {
            member: "testUser2",
            day1: 198,
            day2: 297,
            day3: 305
        };

        const expected = { messge: "member monthly data updated successfully" };

        chai
            .request('http://localhost:3000')
            .put('api/scoreboard/update/')
            .send(updatedRow)
            end(function (er, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.eql(expected);
                done();
        });
    });

    it.skip("should DELETE a row/member from monthlyRaid", function (done) {
        const rowToDel = { member: "admin"};

        const expected = { message: "member monthly data successfully deleted"};

        chai
            .request('http://localhost:3000')
            .put('api/scoreboard/update/')
            .send(rowToDel)
            end (function (err, resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.eql(expected);
                done();
            });
    });

});