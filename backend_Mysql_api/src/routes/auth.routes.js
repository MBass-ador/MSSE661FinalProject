import { Router } from 'express';

import { register/*, login, logout, token*/ } from '../controllers/auth.controller.js';


// new router
const authRoutes = Router();

// routes for authentication
authRoutes.post('/register', register);       // http://localhost:3000/api/auth/register
//authRoutes.post('/login', login);            // http://localhost:3000/api/auth/login
//authRoutes.post('/logout', logout);         // http://localhost:3000/api/auth/logout
//authRoutes.post('/token', token);          // http://localhost:3000/api/auth/token

// exporting routes
export default authRoutes;