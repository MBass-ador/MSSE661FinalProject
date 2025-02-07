/*
Written by Matthew Bass
for MSSE 661 Web Software Development
Regis University
Final Project
*/

// Locating Backend API Endpoints

// location of back-end APIs
const BASE_API_URL = 'http://localhost:3000/api';
const AUTH_API = `${BASE_API_URL}/auth`; // http://localhost:3000/api/auth
const USER_API = `${BASE_API_URL}/user`; // http://localhost:3000/api/user

// returns path to auth api for registration
function register(formData) {
  return _post(`${AUTH_API}/register`, formData); // http://localhost:3000/api/auth/register
}

// returns path to user api for login
function login(formData) {
  return _post(`${AUTH_API}/login`, formData);    // http://localhost:3000/api/user/login
}