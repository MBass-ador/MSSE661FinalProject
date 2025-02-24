// imports
const con = require('../db_config');

const {
    ALL_MONTHS_RAID_DATA,
    SINGLE_MEMB_MONTHLY_DATA,
    NEW_ROW,
    ENTER_DAY1_SCORES,
    ENTER_DAY2_SCORES,
    ENTER_DAY3_SCORES,
    CALC_RAID_TOTAL,
    DELETE_MEMB_MONTHLY_DATA,
    UPDATE_MEMB_MONTHLY_DATA
} = require('../queries/scoreboard.queries');

const query = require('../utils/query');

// 'Monthly Raid' table CRUD Operations 


// Get All Members' Monthly Raid Data
exports.getAllMonthlyData = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });
    // query all members
    const monthlyData = await query(con, ALL_MONTHS_RAID_DATA).catch((err) => {
        res.send(err);
    });
    // check for only 1
    if (tests.length) {
        res.json(monthlyData);
    }
};


// Get One Member's Monthly Raid Data (by member name)
exports.getMembMonthlyData = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });
    // look for member (by name)
    const memb = await query(con, SINGLE_MEMB_MONTHLY_DATA, [req.params.member]).catch(
        (err) => {
            res.send({ msg: 'unable to retrieve member' });
        }
    );
    // check for only 1
    if (test.length) {
        res.json(test);
    }
};

// Add a row of monthly member raid data
exports.addMembRow = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });
    // check if member already has a row
    const memb = await query(con, SINGLE_MEMB_MONTHLY_DATA, [req.params.name]).catch(
        (err) => {
            res.status(500);
            res.send({ msg: 'unable to retrieve user.' });
        }
    );

    // if single response
    if (user.length === 1) {
    res.status(403).send({ msg: 'user already exists' });
    } else {
        // add a row
        const newRow = await query(con, NEW_ROW, [req.params.name]).catch((err) => {
            // abort row addition
            res
                .status(500)
                .send({ msg: 'unable to add row'})
        });

        if (newRow.length) {
            res.send({ msg: 'row added'});
        }
    }
};


// Enter Day 1 Scores for a Member (by member name 'member')
exports.enterDay1Scores = async (req, res) =>{
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });
    // look for member (by name)
    const memb = await query(con, ENTER_DAY1_SCORES, [
        req.body.day1,
        req.params.member
    ]).catch(
        (err) => {
            res.send({ msg: 'unable to set day1 for member' });
        });
    
        if (result.affectedRows === 1) {
            res.json({message: "member's day1 score set" });
        }
};

// Enter Day 2 Scores for a Member (by member name)
exports.enterDay2Scores = async (req, res) =>{
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });
    // look for member (by name)
    const memb = await query(con, ENTER_DAY2_SCORES, [
        req.body.day2,
        req.params.member
    ]).catch(
        (err) => {
            res.send({ msg: 'unable to set day2 for member' });
        });
    
        if (result.affectedRows === 1) {
            res.json({message: "member's day2 score set" });
        }
};

// Enter Day 3 Scores for a Member (by member name)
exports.enterDay3Scores = async (req, res) =>{
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });
    // look for member (by name)
    const memb = await query(con, ENTER_DAY3_SCORES, [
        req.body.day3,
        req.params.member
    ]).catch(
        (err) => {
            res.send({ msg: 'unable to set day3 for member' });
        });
    
        if (result.affectedRows === 1) {
            res.json({message: "member's day3 score set" });
        }
};

// calculate and fill raidTotal (d1 + d2 + d3) (by member name)
exports.raidTotal = async (req, res) =>{
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });

    // get member's monthly raid data (by name)    
    const month = await query(con, SINGLE_MEMB_MONTHLY_DATA, [req.params.member])
    .catch((err) => {
        res.send(err);
    });

    let day1 = month[0].day1;
    let day2 = month[0].day2;
    let day3 = month[0].day3;
    let raidTotal = day1 + day2 + day3;
    
    // set raidTotal
    const setTotal = await query(con, CALC_RAID_TOTAL, [raidTotal, req.params.member])
    .catch((err) => {
        res.send(err);
    });

    // check for only 1
    if (setTotal.affectedRows === 1) {
        res.json({message: 'monthly raid total calculated and applied'});
    }
};

// Update a Member's Monthly Raid Data
exports.updateMembMonthlyData = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });
    
    const result = await query(con, UPDATE_MEMB_MONTHLY_DATA, [
        req.body.day1,
        req.body.day2,
        req.body.day3,
        req.params.member,
    ]).catch((err) => {
        res.send(err);
    });

    // check for only 1
    if (result.affectedRows === 1) {
        res.json({message: 'member monthly data updated successfully'});
    }
};

// Delete a Member's Monthly Raid Data
exports.deleteMembMonthlyData = async (req, res) => {
    // conncetion
    const con = await connection().catch((err) => {
        throw err;
    });

    // delete query
    const result = await query(con, DELETE_MEMB_MONTHLY_DATA, [req.params.id])
    .catch((err) => {
        res.send({err});
    });

    if (result.affectedRows === 1) {
        res.json({message: 'member monthly data successfully deleted'});
    }
}; 