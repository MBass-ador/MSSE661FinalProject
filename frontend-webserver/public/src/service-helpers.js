/*
Written by Matthew Bass
for MSSE 661 Web Software Development
Regis University
Final Project
*/

// Functions for HTTP Requests

// HTTP GET
function _get(url) {
    return fetch(url, {
      method: 'GET'
    });
}


// HTTP POST
function _post(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // '{ "username": "admin", "password": "password"}'
    });
}

// HTTP PUT
function _put(url, data) {
    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
}