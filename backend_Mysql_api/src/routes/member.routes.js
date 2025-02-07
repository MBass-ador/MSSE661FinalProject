// establishing routes for member data


const controller = require('../controllers/member.controller');
const express = require('express'); 

// new router
const memberRoutes = express.Router();

// routes for member data.         
memberRoutes
    .get('/all', controller.getAllMembs)
    .post('/new', controller.addMemb);

// routes by member id.       
memberRoutes
    .get('/get:id', controller.getMemb)
    .put('/edit:id', controller.updateMemb)
    .delete('/del:id', controller.deleteMemb);

// exporting routes
module.exports = memberRoutes;