// imports
import { expect, request } from '../src/utils/test-helper.js';

//chai.use(chaiHttp);

describe('Auth API Service', () => {
  
  // register
  it('should POST a new user', async () => {
    const testUser = {
      username: 'admin',
      email: 'admin@example.com',
      password: 'password'
      
    };
    
    const expectedUser = { 
      username: 'admin',
      email: 'admin@example.com',
      password: 'password',
      
    };

    const resp = await request('http://localhost:3000')
      .post('/api/auth/register')
      .send(testUser);
      
        expect(resp.status).to.be.eql(201);
        expect(resp.body.msg).to.be.eql('user created successfully');
      });
  

  it('should not POST a new user if the name already exists', async () => {
    const testUser = {
      username: 'admin',
      password: 'password',
      email: 'admin@example.com',
    };
    const expected = { msg: 'user already exists' };

    const resp = await request('http://localhost:3000')
      .post('/api/auth/register')
      .send(testUser);
      

    expect(resp.status).to.be.eql(403);
  });



  // login
  it('should POST a login for an existing user', async () => {
    const testUser = {
      username: 'tester',
      password: 'sesame'
    };

    const resp = await request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
      
      //console.log(resp.body);

      expect( resp.body.auth).to.be.true;
      expect(resp.body.expires_in).to.be.eql(86400);
      expect(resp.body.access_token).to.be.a('string');
      expect(resp.body.refresh_token).to.be.a('string');
  });
  

  it('should not POST a login for a user that does not exist', async () => {
    const testUser = {
      username: 'nonexistent',
      password: 'nothing'
    };

    const resp = await request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
        
        //console.log(resp.body);
        
        expect(resp.status).to.be.eql(404);
        expect(resp.body).to.be.eql({ msg: 'db returned: user not found' });
      
  });

  it('should not POST a login for a user with the wrong password', async () => {
    const testUser = {
      username: 'admin',
      password: 'wrongpassword',
    };

    const resp = await request('http://localhost:3000')
      .post('/api/auth/login')
      .send(testUser)
        
    //console.log(resp.body);
        
    expect(resp.status).to.eql(401);
    expect(resp.body).to.eql({ msg: 'invalid password for specified user' });
  });

  // update user data
  it('should update user data with a POST request', async () => {
    const updateRequest = {
      username: 'admin',
      email: 'new@admin.com',
      password: 'newpassword',
      newUsername: 'admin2',
    }
    const resp = await request('http://localhost:3000')
      .post('/api/auth/update')
      .send(updateRequest);
      
        expect(resp.status).to.be.eql(202);
        expect(resp.body.msg).to.be.eql( 'user updated successfully' );
  });



  // logout
  it('should POST a logout', async () => {
    const loginUser = {
      username: 'tester',
      password: 'sesame'
    };

    const login = await request('http://localhost:3000')
      .post('/api/auth/login')
      .send(loginUser)
      
      const refreshToken = login.body.refresh_token;

      //console.log(login.body);

    const logoutResp = await request('http://localhost:3000')
      .post('/api/auth/logout')
      .send({ refresh_token: refreshToken })
      
      //console.log(resp.body);
        
      expect(logoutResp.status).to.eql(200);
      expect(logoutResp.body).to.eql({ msg: 'user logged out successfully' });
    });

});