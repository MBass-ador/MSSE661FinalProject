export const CREATE_MEMBERS_TABLE = `CREATE TABLE IF NOT EXISTS members (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    start_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
    avg_points int DEFAULT 0,
    num_raids int DEFAULT 0,
    PRIMARY KEY (id)
)`;

export const ALL_MEMBS = `SELECT * FROM members`;

export const SINGLE_MEMB = `SELECT * FROM members WHERE name = ?`;

export const INSERT_MEMB = `INSERT INTO members (name) VALUES (?)`;

export const UPDATE_MEMB = `UPDATE members SET name = ? avg_points = ?, num_raids = ? WHERE name = ?`;

export const DELETE_MEMB = `DELETE FROM members WHERE name = ?`;