// imports
const con = require('../db-config');
const queries = require('../queries/member.queries');

// 'Member' CRUD Operations

// Get All Members
exports.getAllMembs = function (req, res) {
    con.query(queries.ALL_MEMBS, function (err, result, fields) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

// Get One Member by name
exports.getMemb = function (req, res) {
    con.query(queries.SINGLE_MEMB, [req.params.name], function (err, result) {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
};

// Add a Member to the Table
exports.addMemb = function (req, res) {
    con.query(queries.INSERT_MEMB, [req.body.name], function (err, result) {
        if (err) {
            res.send(err);
        }
        console.log(result);
        res.json({ message: 'Member "' + req.body.name + '" added.' }   
        );
    });
};

// Update a Member's Details
exports.updateMemb = function (req, res) {
    con.query(
        queries.UPDATE_MEMB, 
        [req.body.name, req.body.status, req.params.id], 
        function (err, data) {
            if (err) {
                res.send(err);
            }
            res.json(data);
        }
    );
}; 

// Delete a Member from the Table
exports.deleteMemb = function (req, res) {
    con.query(queries.DELETE_MEMB, [req.params.name], function (err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Member "' + req.params.name + '" Successfully Deleted.' });
    });
};