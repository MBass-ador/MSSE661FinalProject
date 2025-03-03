
/**
 *     Script to load nav bar and footer into internal pages
 */
document.addEventListener("DOMContentLoaded", function() {
    
    // load nav bar into header
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;

            // Attach event listener for logout button after nav is loaded
            const logoutButton = document.getElementById("logout-button");
            if (logoutButton) {

                logoutButton.addEventListener("click", function(event) {
                    
                    event.preventDefault();
                    
                    console.log('Logout button clicked');

                    // Call doLogout from auth.js
                    if (typeof window.doLogout === 'function') {
                        
                        console.log('Calling doLogout function');
                        
                        window.doLogout(event);
                    } else {
                        console.error('doLogout function is not defined');
                    }
                });
            } else {
                console.error('Logout button not found');
            }
        })
        .catch(error => console.error('error loading navigation:', error));

    // load footer
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        })
        .catch(error => console.error('error loading footer:', error));
});