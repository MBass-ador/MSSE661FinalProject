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
    .get('/all', canAccess, getAllMembs)         //  http://localhost:3000/api/members/all
    .post('/new', canAccess, addMemb);          //  http://localhost:3000/api/members/new

// routes by member name.       
memberRoutes
    .get('/get:name', canAccess, getMemb)          //  http://localhost:3000/api/members/get
    .put('/edit:name', canAccess, updateMemb)     //  http://localhost:3000/api/members/edit
    .delete('/del:name', canAccess, deleteMemb); //  http://localhost:3000/api/members/del

// exporting routes
module.exports = memberRoutes;