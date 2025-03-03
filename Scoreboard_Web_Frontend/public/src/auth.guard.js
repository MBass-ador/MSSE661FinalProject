import { authService } from './auth.service.js';

/**
 * @module authGuard
 * 
 * @description - enforces authorization
 *                  with listener that checks
 *                    for authentication status headers
 *  
 */
document.addEventListener("DOMContentLoaded", function() {
    if (!authService.isAuth || authService.isTokenExpired) {
        console.log('User not authenticated or token expired, redirecting to login page');
        alert("not currently logged in, please log in to access protected content");
        window.location.href = '/';
    } else {
        console.log('User authenticated and token valid');
    }
});




//  IIFE to enforce authorization

// routes enforced based on 
// "isAuth" and "isTokenExpired" 
// values from browser storage
/*(() => {
  console.log('checking authentication status...');
  console.log('isAuth:', authService.isAuth);
  console.log('isTokenExpired:', authService.isTokenExpired);

  if (!authService.isAuth || authService.isTokenExpired) {
    alert("not currently logged in");

    console.log('user is not authenticated or token is expired, logging out...');
    
    authService.logout();
  } else {
    console.log('user is authenticated and token is valid.');
  }
})();*/