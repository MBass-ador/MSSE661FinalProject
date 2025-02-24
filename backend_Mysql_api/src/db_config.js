// creating database connection object and exporting it

// imports
const mysql = require('mysql2');

const { CREATE_MONTHLY_RAID_TABLE } = require('./queries/scoreboard.queries');
const { CREATE_MEMBERS_TABLE } = require('./queries/member.queries');
const { CREATE_USERS_TABLE }  = require('./queries/auth.queries.js');

const query = require('./utils/query.js');

// host
const host = process.env.DB_HOST || 'localhost';

// user
const user = process.env.DB_USER || 'root';

// user password
const password = process.env.DB_PASSWORD || 'sesame';

// database name
const database = process.env.DB_NAME || 'scoreboard';

// create connection and wrap in a promise
const connection = async () => 
    // wrap in a promise
    new Promise((resolve, reject) => {
        // define connection
        const con = mysql.createConnection ({
            host,
            user,
            password,
            database
        });
        
        con.connect((err) => {
            if (err) { 
                reject(err);
                return;
            }
        });
    
        resolve(con);
    });
    // make connection
    (async () => {
        const _con = await connection().catch((err) => {
            throw err;
        });
        // create users table if doesn't exist
        const userTableCreated = await query(_con, CREATE_USERS_TABLE).catch(
            (err) => {
                console.log(err);
            }
        );
        // create members table if doesn't exist
        const memberTableCreated = await query(_con, CREATE_MEMBERS_TABLE).catch(
            (err) => {
                console.log(err);
            }
        );
        // create monthly raid table if doesn't exist
        const makeMonthlyRaidTable = await query(_con, CREATE_MONTHLY_RAID_TABLE).catch(
            (err) => {
                console.log(err);
            }
        );
        // make sure tables exist*/
    if (!!userTableCreated && !!memberTableCreated && !!makeMonthlyRaidTable) {
        console.log('user, member, and monthly raid tables ready to use');
    }
})();

// export connection as "con"
module.exports = connection;