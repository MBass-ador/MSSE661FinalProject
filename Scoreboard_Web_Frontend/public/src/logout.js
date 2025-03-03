/**
 *      logout functionality used in nav bar
 */
console.log('logout.js loaded');

document.addEventListener("DOMContentLoaded", function() {

    console.log('DOM fully loaded and parsed');

    const logoutButton = document.getElementById("logout-button");

    if (logoutButton) {
        logoutButton.addEventListener("click", function(event) {
            
            event.preventDefault();
            
            console.log('logout button clicked');

            // Call doLogout from auth.js
            if (typeof window.doLogout === 'function') {
                
                console.log('calling doLogout function');
                
                window.doLogout(event);
            } else {
                console.error('error locating doLogout function');
            }
        });
    } else {
        console.error('logout button not found');
    }
    // redirect to login page 
    window.location.href = "/";
});