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

// route for all monthly data.         
scoreboardRoutes.get('/', canAccess, getAllMonthlyData);

// routes by member name.      
scoreboardRoutes
    .get('/get/:name', canAccess, getMembMonthlyData)
    .post('/new', canAccess, addMembRow)
    .put('/update/:name', canAccess, updateMembMonthlyData)
    .delete('/del/:name', canAccess, deleteMembMonthlyData);

// routes to enter scores (by member name)
scoreboardRoutes
    .post('/enter/day1/:name', canAccess, enterDay1Scores)
    .post('/enter/day2/:name', canAccess, enterDay2Scores)
    .post('/enter/day3/:name', canAccess, enterDay3Scores);

// route to calculate total (by member name)
scoreboardRoutes
    .post('/total/:name', canAccess, membRaidTotal);
  
// exporting routes
module.exports = scoreboardRoutes;