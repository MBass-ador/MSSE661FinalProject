import { authService } from './auth.service.js';

//  IIFE to enforce authorization

// routes enforced based on 
// "isAuth" and "isTokenExpired" 
// values from browser storage
(() => {
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
})();