/*
Written by Matthew Bass
for MSSE 661 Web Software Development
Regis University
Final Project
*/

import { getStorage } from './simple-storage.js';

// token storage
//const access_token = storageHasData() ? getStorage('access_token') : '';
//const token = access_token ? `Bearer ${access_token}` : '';

// default options for HTTP requests
const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json'
  },
};

const DEFAULT_OPTIONS_WITH_AUTH = {
  headers: {
    Authorization: `Bearer ${getStorage('access_token')}`,

    'Content-Type': 'application/json'
  },
};

const OPTIONS_JUST_AUTH = {
  headers: {
    Authorization: `Bearer ${getStorage('access_token')}`
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
export const _get = async (url, options = DEFAULT_OPTIONS_WITH_AUTH) => {
  console.log('GET request URL:', url);

  console.log('GET request Options:', options);

  try {
    const res = await fetch(url, {
      method: 'GET',
      ...options
    });

    if (!res.ok) {
      console.error('GET request failed:', res.status, res.statusText);

      throw new Error(`HTTP error, status: ${res.status}`);
    }

    const data = await res.json();

    console.log('GET response data:', data);

    return data;
  } catch (error) {
    console.error('GET request error:', error);

    throw error;
  }
};


/**
 *    HTTP POST
 * 
 * @param {String} url        - address to send request
 * @param {Object} data       - data to send
 * @param {Object} options    - specified above
 * @returns                   - JSON response from server
 */
export const _post = async (url, data, options = DEFAULT_OPTIONS) => {
  console.log('POST request URL:', url);
  console.log('POST request data:', data);
  console.log('POST request options:', options);

  try {
    const res = await fetch(url, {
      method: 'POST',
      ...options,
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      console.error('POST request failed:', res.status, res.statusText);

      throw new Error(`HTTP error, status: ${res.status}`);
    }

    const responseData = await res.json();

    console.log('POST response data:', responseData);

    return responseData;

  } catch (error) {
    console.error('POST request error:', error);

    alert('error detected while processing request, try again.');

    throw error;
  }
};


/**
 *    HTTP PUT
 * 
 * @param {String} url        - address to send request
 * @param {Object} data       - data to send
 * @param {Object} options    - specified above
 * @returns                   - JSON response from server
 */
export const _put = async (url, data, options = DEFAULT_OPTIONS_WITH_AUTH) => {
  console.log('PUT request URL:', url);
  console.log('PUT request Data:', data);
  console.log('PUT request Options:', options);

  try {
    const res = await fetch(url, {
      method: 'PUT',
      ...options,
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      console.error('PUT request failed:', res.status, res.statusText);

      throw new Error(`HTTP error, status: ${res.status}`);
    }

    const responseData = await res.json();

    console.log('PUT response data:', responseData);

    return responseData;
  } catch (error) {
    console.error('PUT request error:', error);
    throw error;
  }
};


/**
 *    HTTP DELETE
 * 
 * @param {String} url        - address to send request
 * @param {Object} options    - specified above
 * @returns                   - JSON response from server
 */
export const _delete = async (url, options = DEFAULT_OPTIONS_WITH_AUTH) => {
  console.log('DELETE request URL:', url);
  console.log('DELETE request Options:', options);

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      ...options,
    });

    if (!res.ok) {
      console.error('DELETE request failed:', res.status, res.statusText);

      throw new Error(`HTTP error, status: ${res.status}`);
    }

    const responseData = await res.json();

    console.log('DELETE response data:', responseData);

    return responseData;
  } catch (error) {
    console.error('DELETE request error:', error);
    
    throw error;
  }
};