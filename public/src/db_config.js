// creating database connection object and exporting it

// imports
const mysql = require('mysql2');
const queries = require('./queries/scoreboard.queries');

// host
const host = process.env.DB_HOST || 'localhost';

// user
const user = process.env.DB_USER || 'root';

// user password
const password = process.env.DB_PASSWORD || 'sesame';

// database name
const database = process.env.DB_NAME || 'scoreboard';

// create connection
const con = mysql.createConnection ({
    host,
    user,
    password,
    database
});


// connect to db
con.connect(function (err) {
    if (err) throw err;
    console.log('db connection established');
    
    con.query(queries.CREATE_MEMBERS_TABLE, function (err, result) {
        if (err) throw err;
        console.log('members table ready to use.');
    });

    con.query(queries.CREATE_MONTHLY_RAID_TABLE, function (err, result) {
        if (err) throw err;
        console.log("this month's raid table ready to use.");
    });
});

// export connection as "con"
module.exports = con;