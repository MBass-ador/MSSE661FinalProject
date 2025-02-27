/*
Written by Matthew Bass
for MSSE 661 Web Software Development
Regis University
Final Project
*/

// Locating Backend API Endpoints

// location of back-end APIs
const AUTH_API = `${BASE_API_URL}/auth`; // http://localhost:3000/api/auth
const USER_API = `${BASE_API_URL}/user`; // http://localhost:3000/api/user

/**
 * @class AuthService
 * 
 * handles authentication services
 */
class AuthService {

  /**
  * posts form data to register API
  * 
  * @param {*} formData - registration data to send
  */
  register = (formData) => _post(`${AUTH_API}/register`, formData);

  
  /**
  * posts form data to login API
  * 
  * @param {*} formData - login data to send
  */
  login = (formData) => _post(`${AUTH_API}/login`, formData);


  /**
  * sets expiration time for tokens
  * 
  * @param {*} maxExpiration - max expiration time in seconds
  */
  setExpiration = (maxExpiration) =>
    new Date(new Date().getTime() + maxExpiration * 1000);


  /**
  * checks authentication status
  * 
  * @returns -   boolean 
  *              whether user is authenticated
  */
  isAuth = () => {
    return getStorage('access_token');
  }


  /**
  * checks token expiration
  * using "expires_in" value from local storage
  * and the token itself
  */
  isTokenExpired() {
    const expireDate = getStorage('expires_in');
    const isExpired = expireDate === new Date();

    if (isExpired) {
      localStorage.clear();
    }
    return isExpired;
  };


  /**
  * logs out user
  * clears local storage
  * redirects back to index.html (login page)
  */
  logout = () => {
    localStorage.clear();
    window.location.href = '/index.html';
  };

}

// new instance of AuthService
const authService = new AuthService();