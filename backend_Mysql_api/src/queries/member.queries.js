// Definng SQL queries for 
// mysql database
// table: members

// Member table queries

// create a table "members" 
// with id(pk), name, start_date, average_points and num_raids columns
exports.CREATE_MEMBERS_TABLE = `CREATE TABLE IF NOT EXISTS members (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
    avg_points int DEFAULT 0,
    num_raids int DEFAULT 0,
    PRIMARY KEY (id)
)`;

// retrieve all members
exports.ALL_MEMBS = `SELECT * FROM members`;

// retrieve a single member (by name)
exports.SINGLE_MEMB = `SELECT * FROM members WHERE name = ?`;

// add a member (to table)
exports.INSERT_MEMB = `INSERT INTO members (name) VALUES (?)`;

// update a member's details
exports.UPDATE_MEMB = `UPDATE members SET name = ? avg_points = ?, num_raids = ? WHERE name = ?`;

// delete a member (from table) by name
exports.DELETE_MEMB = `DELETE FROM members WHERE name = ?`;