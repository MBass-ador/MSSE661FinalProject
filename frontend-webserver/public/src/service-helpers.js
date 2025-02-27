/*
Written by Matthew Bass
for MSSE 661 Web Software Development
Regis University
Final Project
*/

// token storage
const access_token = storageHasData() ? getStorage('access_token') : '';
const token = `Bearer ${access_token}`;

// define options
const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json'
  },
};

const DEFAULT_OPTIONS_WITH_AUTH = {
  headers: {
    Authorization: token,
    'Content-Type': 'application/json'
  },
};

const OPTIONS_JUST_AUTH = {
  headers: {
    Authorization: token
  },
};


// Functions for HTTP Requests


/**
 *    HTTP GET
 * 
 * @param {String} url        - address to send request
 * @param {Object} options    - specified above
 * @returns                   - JSON response from server
 */
const _get = async (url, options = DEFAULT_OPTIONS_WITH_AUTH) => {
  const res = await fetch(url, {
    method: 'GET',
    ...options
  });
  return res.json();
};


/**
 *    HTTP POST
 * 
 * @param {String} url        - address to send request
 * @param {Object} data       - data to send
 * @param {Object} options    - specified above
 * @returns                   - JSON response from server
 */
const _post = async (url, data, options = DEFAULT_OPTIONS) => {
  const res = await fetch(url, {
    method: 'POST',
    ...options,
    body: JSON.stringify(data)
  });
  return res.json();
};


/**
 *    HTTP PUT
 * 
 * @param {String} url        - address to send request
 * @param {Object} data       - data to send
 * @param {Object} options    - specified above
 * @returns                   - JSON response from server
 */
const _put = async (url, data, options = DEFAULT_OPTIONS_WITH_AUTH) => {
  const res = await fetch(url, {
    method: 'PUT',
    ...options,
    body: JSON.stringify(data)
  });
  return res.json();
}


/**
 *    HTTP DELETE
 * 
 * @param {String} url        - address to send request
 * @param {Object} options    - specified above
 * @returns                   - JSON response from server
 */
const _delete = async (url, options = DEFAULT_OPTIONS_WITH_AUTH) => {
  const res = await fetch(url, {
    method: 'DELETE',
    ...options,
  });
  return res.json();
};