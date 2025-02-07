// imports
const con = require('../db-config');
const queries = require('../queries/scoreboard.queries');


// 'Monthly Raid' table CRUD Operations


// Get All Members' Monthly Raid Data
exports.getAllMonthlyData = function (req, res) {
    con.query(queries.ALL_MONTHS_RAID_DATA, function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

// Get One Member's Monthly Raid Data (by member name)
exports.getMembMonthlyData = function (req, res) {
    con.query(queries.SINGLE_MEMB_MONTHLY_DATA, [req.params.member], function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

// Enter Day 1 Scores for a Member (by member name)
exports.enterDay1Scores = function (req, res) {
    con.query(queries.ENTER_DAY1_SCORES, [req.body.day1, req.params.member], function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

// Enter Day 2 Scores for a Member (by member name)
exports.enterDay2Scores = function (req, res) {
    con.query(queries.ENTER_DAY2_SCORES, [req.body.day2, req.params.member], function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

// Enter Day 3 Scores for a Member (by member name)
exports.enterDay3Scores = function (req, res) {
    con.query(queries.ENTER_DAY3_SCORES, [req.body.day3, req.params.member], function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

// Update a Member's Monthly Raid Data
exports.updateMembMonthlyData = function (req, res) {
    con.query(
        queries.UPDATE_MEMB_MONTHLY_DATA, 
        [req.body.day1, req.body.day2, req.body.day3, req.params.member], 
        function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        }
    );
};

// Delete a Member's Monthly Raid Data
exports.deleteMembMonthlyData = function (req, res) {
    con.query(queries.DELETE_MEMB_MONTHLY_DATA, [req.params.member], function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: req.params.member + "'s monthly data Successfully Deleted." });
    });
}; 