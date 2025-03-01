// creating database connection object and exporting it

// imports
import { createConnection } from 'mysql';

import { CREATE_MONTHLY_RAID_TABLE } from './queries/scoreboard.queries.js';
import { CREATE_MEMBERS_TABLE } from './queries/member.queries.js';
import { CREATE_USERS_TABLE } from './queries/user.queries.js';

import query from './utils/query.js';

// host
const host = process.env.DB_HOST || 'localhost';

// user
const user = process.env.DB_USER || 'root';

// user password
const password = process.env.DB_PASSWORD || 'password-1234';

// database name
const database = process.env.DB_NAME || 'scoreboard';

// create connection and wrap in a promise
const connection = async () => 
    // wrap in a promise
    new Promise((resolve, reject) => {
        // define connection
        const con = createConnection ({
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
    // make async connection
    (async () => {
        const _con = await connection().catch((err) => {
            throw err;
        });

        // create users table if doesn't exist
        const userTableCreated = await query(_con, CREATE_USERS_TABLE)
        .catch( (err) => {console.log(err);
        });
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
export default connection;