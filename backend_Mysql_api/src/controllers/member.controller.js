// imports
const connection = require('../db-config');

const {
    ALL_MEMBS,
    SINGLE_MEMB,
    INSERT_MEMB,
    UPDATE_MEMB,
    DELETE_MEMB
} = require('../queries/member.queries');

const query = require('../utils/query');

// 'Member' CRUD Operations

// Get All Members
exports.getAllMembs = async (req, res) =>{
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });
    // query all tests
    const membs = await query(con, ALL_MEMBS).catch((err) => {
        res.send(err);
    });
    // check for only 1
    if (membs.length) {
        res.json(tests);
    }
};

// Get One Member by name
exports.getMemb = async (req, res) =>{
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });

    // look for test
    const memb = await query(con, SINGLE_MEMB, [req.params.name]).catch(
        (err) => {
            res.send({ msg: 'unable to retrieve member' });
        }
    );

    // check for only 1
    // check for only 1
    if (test.length) {
        res.json(memb);
    }
};

// Add a Member to the Table
exports.addMemb = async (req, res) =>{
    // verify token
    const decoded = req.user;

    if (decoded.id) {
        // conncetion
        const con = await connection().catch((err) => {
            throw err;
        });

        // insert query
        const result = await query(con, INSERT_MEMB, [req.body.name]).catch(
            (err) => {
                res.send(err);
            }
        );

        // log it
        console.log(result);

        // check for only 1
        if (result.affectedRows === 1) {
            res.json({ message: 'member successfully added' });
        }
    }
};

// Update a Member's Details
exports.updateMemb = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });

    // update query
    const result = await query(con, UPDATE_MEMB, [ 
        req.body.name,
        req.body.avg_points,
        req.body.num_raids,
        req.params.name
    ]).catch((err) => {
        res.send(err);
    });
    
    // check for only 1
    if (result.affectedRows === 1) {
        res.json({message: 'member details successfully updated' });
    }
}; 

// Delete a Member from the Table
exports.deleteMemb = async (req, res) =>{
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });
    // delete query
    const result = await query(con, DELETE_MEMB, [req.params.id]).catch(
        (err) => {
            res.send({err});
        }
    );
        // check for only 1
    if (result.affectedRows === 1) {
        res.json({message: 'member successfully deleted'});
    }
};