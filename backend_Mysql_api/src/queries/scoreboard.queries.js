export const CREATE_MONTHLY_RAID_TABLE = `CREATE TABLE IF NOT EXISTS monthly_raid (  
    id int NOT NULL AUTO_INCREMENT,
    member varchar(255) NOT NULL,
    day1 int DEFAULT 0,
    day2 int DEFAULT 0,
    day3 int DEFAULT 0,
    raidTotal int DEFAULT 0,
    PRIMARY KEY (id)
)`;

export const ALL_MONTHS_RAID_DATA = `SELECT * FROM monthly_raid`;

export const SINGLE_MEMB_MONTHLY_DATA = `SELECT * FROM monthly_raid WHERE member = ?`;

export const NEW_ROW = `INSERT INTO monthly_raid (member) VALUES (?)`

export const ENTER_DAY1_SCORES = `UPDATE monthly_raid SET day1 = ? WHERE member = ?`;

export const ENTER_DAY2_SCORES = `UPDATE monthly_raid SET day2 = ? WHERE member = ?`;

export const ENTER_DAY3_SCORES = `UPDATE monthly_raid SET day3 = ? WHERE member = ?`;

export const CALC_RAID_TOTAL =   `UPDATE monthly_raid SET raidTotal = ? WHERE member = ?`;

export const DELETE_MEMB_MONTHLY_DATA = `DELETE FROM monthly_raid WHERE member = ?`;

export const UPDATE_MEMB_MONTHLY_DATA = `UPDATE monthly_raid 
                                    SET day1 = ?, 
                                    day2 = ?, 
                                    day3 = ? 
                                    WHERE member = ?`;