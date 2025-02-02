// establishing routes for tests


// Need more knowledge to complete this page  (right now has values for a single test table in use)

const controllers = require('../controllers/scoreboard.controller');
const express = require('express'); 

// express routes for tests
const scoreboardRoutes = express.Router();

// routes for all tests. `/tests/`        update when controllers complete
scoreboardRoutes.get('/', controllers.getAllTests).post('/', controllers.createTest);

// routes by testID.  `/tests/:testID`     update when controllers complete
testRoutes
    .get('/:id', controllers.getTest)
    .put('/:id', controllers.updateTest)
    .delete('/:id', controllers.deleteTest);

// exporting routes
module.exports = testRoutes;