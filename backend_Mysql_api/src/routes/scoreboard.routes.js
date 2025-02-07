// establishing routes for monthly raid data


const controller = require('../controllers/scoreboard.controller');
const express = require('express'); 

// new router
const scoreboardRoutes = express.Router();

// route for all monthly data.         
scoreboardRoutes.get('/', controller.getAllMonthlyData).post('/');

// routes by member name.  `/members/:id`     
scoreboardRoutes
    .get('/:id', controller.getMembMonthlyData)
    .put('/:id', controller.updateMembMonthlyData)
    .delete('/:id', controller.deleteMembMonthlyData);

// routes to enter scores
scoreboardRoutes
    .post('/enter/day1', controller.enterDay1Scores)
    .post('/enter/day2', controller.enterDay2Scores)
    .post('/enter/day3', controller.enterDay3Scores)
  
// exporting routes
module.exports = scoreboardRoutes;