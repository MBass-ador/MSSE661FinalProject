// imports
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Auth API service', () => {
  
  // register
  it.skip('should POST a new user', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    };
    
    const expected = { msg: 'new user created'};

    chai
      .request('http://localhost:3000')
      .post('/api/auth/register')
      .send(testUser)
      .end((err, resp) => {
        if (err) done(err);
        console.log(resp.body);
        
        expect(resp.body).to.eql(expected);
        done();
      });
  });

  it('should not POST a new user if they already exist', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    };
    const expected = { msg: 'user already exists' };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/register')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body).to.eql(expected);
        done();
      });
  });


  // login
  it('should POST a login for an existing user', (done) => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body.auth).to.be.true;
        expect(resp.body.expires_in).to.be.eql(86400);
        expect(resp.body.access_token).to.be.a('string');
        expect(resp.body.refresh_token).to.be.a('string');
        done();
      });
  });

  it.skip('should not POST a login for a user that does not exist', (done) => {
    const testUser = {
      username: 'nonexistent',
      password: 'password'
    };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
      .end((err, resp) => {
        expect(err.status).to.eql(500);
        //expect(resp.body).to.eql({ msg: 'unable to retrieve user' });
        done();
      });
  });

  it('should not POST a login for a user with the wrong password', (done) => {
    const testUser = {
      username: 'admin',
      password: 'wrongpassword',
      email: 'admin@example.com'
    };

    chai
      .request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
      .end((err, resp) => {
        expect(resp.body).to.eql({ msg: 'invalid password!' });
        done();
      });
  });


  // logout
  it('should POST a logout', (done) => {
    chai
      .request('http://localhost:3000')
      .post('/api/auth/logout')
      .end((err, resp) => {
        if (err) {
          console.error(err);
          return done(err);
        }
        expect(resp.body).to.eql({ msg: 'logout successful' });
        done();
      });
    });

});