// Definng SQL queries for 
// mysql database
// table: monthly_raid


// Monthly Raid Table queries

// create a new monthly raid table
// with columns: member, day1, day2, day3, raidTotal
exports.CREATE_MONTHLY_RAID_TABLE = `CREATE TABLE IF NOT EXISTS monthly_raid (  
    id int NOT NULL AUTO_INCREMENT,
    member varchar(255) NOT NULL,
    day1 int DEFAULT 0,
    day2 int DEFAULT 0,
    day3 int DEFAULT 0,
    raidTotal int DEFAULT 0
)`;

// retrieve all members' monthly raid data
exports.ALL_MONTHS_RAID_DATA = `SELECT * FROM monthly_raid`;

// retrieve single member's monthly raid data (by 'member' name)
exports.SINGLE_MEMB_MONTHLY_DATA = `SELECT * FROM monthly_raid WHERE member = ?`;

// enter day1 score for a member (by member name)
exports.ENTER_DAY1_SCORES = `UPDATE monthly_raid SET day1 = ? WHERE member = ?`;

// enter day2 score for a member (by member name)
exports.ENTER_DAY2_SCORES = `UPDATE monthly_raid SET day2 = ? WHERE member = ?`;

// enter day3 score for a member (by member name)
exports.ENTER_DAY3_SCORES = `UPDATE monthly_raid SET day3 = ? WHERE member = ?`;

// caculate and fill raidTotal (d1 + d2 + d3) (by membber name)
exports.CALC_RAID_TOTAL =   `UPDATE monthly_raid 
                                SET raidTotal = day1+day2+day3 
                                WHERE member = ?`;

// delete a member's monthly raid data (by member name)
exports.DELETE_MEMB_MONTHLY_DATA = `DELETE FROM monthly_raid WHERE member = ?`;

// update a member's monthly raid data (by member name)
exports.UPDATE_MEMB_MONTHLY_DATA = `UPDATE monthly_raid SET day1 = ?, day2 = ?, day3 = ? WHERE member = ?`;