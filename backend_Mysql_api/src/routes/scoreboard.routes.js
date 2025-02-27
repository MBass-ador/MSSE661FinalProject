// establishing routes for monthly raid data

const express = require('express');

const {
    getAllMonthlyData,
    getMembMonthlyData,
    addMembRow,
    enterDay1Scores,
    enterDay2Scores,
    enterDay3Scores,
    membRaidTotal,
    updateMembMonthlyData,
    deleteMembMonthlyData
} = require('../controllers/scoreboard.controller');

const canAccess = require('../middleware/auth.middleware');

// new router
const scoreboardRoutes = express.Router();

// route for all monthly data         
scoreboardRoutes.get('/getall', canAccess, getAllMonthlyData);    // http://localhost:3000/api/scoreboard/getall

// routes by member name (CRUD)      
scoreboardRoutes
    .get('/getone:name', canAccess, getMembMonthlyData)          // http://localhost:3000/api/scoreboard/getone
    .post('/new', canAccess, addMembRow)                        // http://localhost:3000/api/scoreboard/new
    .put('/update:name', canAccess, updateMembMonthlyData)     // http://localhost:3000/api/scoreboard/update
    .delete('/del:name', canAccess, deleteMembMonthlyData);   // http://localhost:3000/api/scoreboard/del

// routes to enter scores (for all members)
scoreboardRoutes
    .post('/enter/day1', canAccess, enterDay1Scores)       // http://localhost:3000/api/scoreboard/enter/day1
    .post('/enter/day2', canAccess, enterDay2Scores)      // http://localhost:3000/api/scoreboard/enter/day2
    .post('/enter/day3', canAccess, enterDay3Scores);    // http://localhost:3000/api/scoreboard/enter/day3

// route to calculate total (by member name)
//scoreboardRoutes
    //.post('/total:name', canAccess, membRaidTotal);
  
// exporting routes
module.exports = scoreboardRoutes;