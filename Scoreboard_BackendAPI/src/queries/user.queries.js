export const CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
  )`;

// CRUD queries

// add new user 
export const INSERT_NEW_USER = () => 
  `INSERT INTO users (username, email, password) 
             VALUES (?, ?, ?)`;


// get user               (by name)               (does not return password)
export const GET_USER_BY_NAME = () => 
  `SELECT user_id, username, email FROM users WHERE username = ?`;

// get user               (by name)               (includes password)
export const GET_USER_WITH_PASSWORD_BY_NAME = () => 
  `SELECT * FROM users WHERE username = ?`;   


// change user details    (by name)
export const UPDATE_USER = ()  => 
  `UPDATE users 
                SET 
                  username = ?, 
                  email = ?, 
                  password = ?
                WHERE username = ?`;


// delete user            (by name)
export const DELETE_USER = ()  => 
  `DELETE FROM users 
                  WHERE username = ?`;