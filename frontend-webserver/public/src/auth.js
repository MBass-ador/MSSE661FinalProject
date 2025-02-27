/*
Written by Matthew Bass
     for MSSE 661 Web Software Development
     Regis University
     Final Project
*/

// Authentication Functions


/**
 *    login function
 * 
 * @param {*} e  - any errors
 */
const doLogin = async (e) => {
  // overide defaults and get login credentials from form
  e.preventDefault();
  const username = document.getElementById('formInputUsername').value;
  const password = document.getElementById('formInputPassword').value;

  try {
    const res = await authService.login({ username, password });
    const{
      auth,
      expires_in,
      access_token,
      refresh_token,
    } = res;
    const expiration = authService.setExpiration(expires_in);

    setStorage('isAuth', auth);
    setStorage('expires_in', expiration);
    setStorage('access_token', access_token);
    setStorage('refresh_token', refresh_token);

    if (res) {
      window.location.href = 'home.html';
    }
  } catch (error) {
    alert('user login failed, please try again');
  }
};


/**
 *    register function
 * 
 * @param {*} e  - any errors
 */
const doRegister = async (e) => {
  // overide defaults and get registration entriess from form
  e.preventDefault();
  const username = document.getElementById('formInputUsernameReg').value;
  const email = document.getElementById('formInputEmailReg').value;
  const password = document.getElementById('formInputPasswordReg').value;

  try {
    // build response
    const res = await authService.register({
      username,
      email,
      password,
    });

    // when finished, go to login
    if (res) {
      window.location.href = '/';
    }
  } catch (err) {
    alert('user registration failed, please try again');
  }
  
};


/**
 *    logout function
 * 
 * @param {*} e  - any errors
 */
const doLogout = (e) => {
  // overide defaults
  e.preventDefault();
  // call logout
  authService.logout();
};