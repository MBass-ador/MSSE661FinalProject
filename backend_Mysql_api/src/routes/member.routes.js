// establishing routes for member data


const express = require('express');

const {
    getAllMembs,
    getMemb,
    addMemb,
    updateMemb,
    deleteMemb
} = require('../controllers/member.controller');
 
const canAccess = require('../middleware/auth.middleware');

// new router
const memberRoutes = express.Router();

// routes for member data.         
memberRoutes
    .get('/all', canAccess, getAllMembs)
    .post('/new', canAccess, addMemb);

// routes by member name.       
memberRoutes
    .get('/get:name', canAccess, getMemb)
    .put('/edit:name', canAccess, updateMemb)
    .delete('/del:name', canAccess, deleteMemb);

// exporting routes
module.exports = memberRoutes;