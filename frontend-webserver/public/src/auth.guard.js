//  IIFE to enforce authorization

// routes enforced based on 
// "isAuth" and "isTokenExpired" 
// values from browser storage
(() => {
  if (!authService.isAuth || authService.isTokenExpired) {
    alert("log in to access testing list");
    authService.logout();
  }
})();