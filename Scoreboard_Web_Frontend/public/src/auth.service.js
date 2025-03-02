/*
Written by Matthew Bass
for MSSE 661 Web Software Development
Regis University
Final Project
*/

import { 
        getStorage, 
        setStorage, 
        clearStorage } from './simple-storage.js';

import { _post } from './service-helpers.js';

import { BASE_API_URL } from './api.config.js'; // Import BASE_API_URL


// location of back-end API endpoints
const AUTH_API = `${BASE_API_URL}/auth`; // http://localhost:3000/api/auth
//const USER_API = `${BASE_API_URL}/user`; // http://localhost:3000/api/user

 
/**
 * @class AuthService
 * 
 * handles authentication services
 */
class AuthService {


  /**
  * posts form data to register API
  * 
  * @param {Object} formData - registration data to send
  */
  register = (formData) => {
    console.log('registering user with supplied data:', formData);

    return _post(`${AUTH_API}/register`, formData);
  };

  
  /**
  * posts form data to login API
  * 
  * @param {Object} formData - login data to send
  */
  login = (formData) => {
    console.log('logging in user with supplied data:', formData);

    return _post(`${AUTH_API}/login`, formData);
  };


  /**
  * sets expiration time for tokens
  * 
  * @param {number} maxExpiration - max expiration time in seconds
  */
  setExpiration = (maxExpiration) => {
    // set expiration date
    const expirationDate = new Date(Date.now() + maxExpiration * 1000);

    console.log('setting token expiration date to:', expirationDate);

    return expirationDate;
  };


  /**
  * checks authentication status
  * 
  * @returns -   boolean 
  *              whether user is authenticated
  */
  get isAuth() {
    const token = getStorage('access_token');

    console.log('checking authentication status, token exists:', !!token);

    return !!token;
  }


  /**
  * checks token expiration
  *   using "expires_in" value from local storage
  *     and the token itself
  * 
  * @returns -   boolean
  *              whether token is expired
  */
  get isTokenExpired() {
    const expireDate = getStorage('expires_in');

    console.log('Checking token expiration. Expiration date:', expireDate);

    // when not expired, return right away
    if (!expireDate) return true;

    // boolean if expired
    const isExpired = new Date() >= new Date(expireDate);

    console.log('token is expired:', isExpired);

    // when expired
    if (isExpired) {
      console.log('clearing local storage due to expired token');
      // remove auth data from browser storage
      clearStorage('access_token');
      clearStorage('expires_in');

      alert('Your session has expired. Please log in again.');
      // redirect to login page
      window.location.href = '/index.html';
    }
    // boolean
    return isExpired;
  }


  /**
  * logs out user
  *   clears local storage
  *     redirects back to index.html (login page)
  */
  logout = () => {
    console.log('logging out user, clearing local storage, and redirecting to login page.');
    
    // remove auth data from browser storage
    clearStorage('access_token');
    clearStorage('expires_in');

    // redirect to login page
    window.location.href = '/index.html';
  };


}

// new instance of AuthService
export const authService = new AuthService();