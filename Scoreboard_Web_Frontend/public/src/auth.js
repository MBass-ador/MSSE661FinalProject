/*
Written by Matthew Bass
     for MSSE 661 Web Software Development
     Regis University
     Final Project
*/

import { authService } from './auth.service.js';
import { setStorage } from './simple-storage.js';


// Authentication Functions


/**
 *    login function
 * 
 * @param {Event} e  - form submission event
 */
export const doLogin = async (e) => {
  alert('doLogin function called');
  // overide defaults and get login credentials from form
  e.preventDefault();

  // get username and password from form
  const username = document.getElementById('formInputUsername').value;

  const password = document.getElementById('formInputPassword').value;

  console.log('attempting login with username:', username);

  try {
    const res = await authService.login({ username, password });

    console.log('login response:', res);

    const{
      auth,
      expires_in,
      access_token,
      refresh_token,
    } = res;

    console.log('Auth:', auth);
    console.log('Expires in:', expires_in);
    console.log('Access token:', access_token);
    console.log('Refresh token:', refresh_token);

    const expiration = authService.setExpiration(expires_in);

    console.log('token expiration set to:', expiration);

    setStorage('isAuth', auth);
    setStorage('expires_in', expiration);
    setStorage('access_token', access_token);
    setStorage('refresh_token', refresh_token);

    if (res) {
      console.log('login successful, redirecting to home page');
      
      window.location.href = '/Home.html';
    }
  } catch (error) {
    console.error('login error:', error);
    
    alert('user login failed, please try again');
  }
};

// Attach doLogin to the window object
window.doLogin = doLogin;

/**
 *    register function
 * 
 * @param {Event} e  - form submission event
 */
export const doRegister = async (e) => {
  // overide defaults and get registration entriess from form
  e.preventDefault();

  // get username, email, and password from form
  const username = document.getElementById('formInputUsernameReg').value;
  const email = document.getElementById('formInputEmailReg').value;
  const password = document.getElementById('formInputPasswordReg').value;

  console.log('attempting registration with username:', username);
  console.log('Email:', email);
  console.log('password:private');

  try {
    // build response
    const res = await authService.register({
      username,
      email,
      password,
    });

    // when finished, go to login
    if (res) {
      console.log('registration successful, redirecting to login page');
      
      window.location.href = '/';
    }
  } catch (err) {
    console.error('Registration error:', err);

    alert('user registration failed, try again');
  }
};


/**
 *    logout function
 * 
 * @param {Event} e  - form submission event
 */
export const doLogout = (e) => {
  // overide defaults
  e.preventDefault();
  // call logout
  authService.logout();
};