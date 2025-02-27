const express = require('express');

const {
    register,
    login,
    logout,
    token
} = require('../controllers/auth.controller');


// new router
const authRoutes = express.Router();

// routes for authentication
authRoutes.post('/register', register);       // http://localhost:3000/api/auth/register
authRoutes.post('/login', login);            // http://localhost:3000/api/auth/login
authRoutes.post('/logout', logout);         // http://localhost:3000/api/auth/logout
authRoutes.post('/token', token);          // http://localhost:3000/api/auth/token

// exporting routes
module.exports = authRoutes;
