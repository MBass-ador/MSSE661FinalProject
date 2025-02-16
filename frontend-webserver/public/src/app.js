/*
Written by Matthew Bass
     for MSSE 661 Web Software Development
     Regis University
     Final Project
*/

// Authentication Functions

// login function
const doLogin = async (e)  => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await doLogin({ username, password }); 
  
  const { 
      auth, 
      access_token, 
      refresh_token 
  } = response;

setStorage('isAuth', auth);
setStorage('access_token', access_token);
setStorage('refresh_token', refresh_token);

window.location.href = 'home.html';
  };


// register function
  const doRegister = function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    register({
      username,
      email,
      password
    }).then((res) => {
      window.location.href = '/';
    });
};
  
  
  // log out function (not yet functional)
  const doLogout = (e) => {
    e.preventDefault();
    logout();
    window.location.href = '/';
  };
  

  // check if user is logged in (self executing)
  (() => {
    if (storageHasData()) {
      const isAuth = getStorage('isAuth');
  
      if (!isAuth) {
        document.getElementById('logout').style.display = 'none';
      } else {
        document.getElementById('logout').style.display = 'block';
      }
    }
  
})();