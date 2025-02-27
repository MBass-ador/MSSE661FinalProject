// create new table:  user_id(pk), username, email, password
exports.CREATE_USERS_TABLE = `CREATE TABLE IF NOT EXISTS users(
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
  )`;

// CRUD queries

// add new user 
exports.INSERT_NEW_USER = (username, email, password) => 
  `INSERT INTO users (username, email, password) VALUES ($(username), $(email), $(password))`;


// get user               (by name)               (does not return password)
exports.GET_USER_BY_NAME = (username) =>
  `SELECT user_id, username, email FROM users WHERE username = $(username)`;

// get user               (by name)               (includes password)
exports.GET_USER_WITH_PASSWORD_BY_NAME = (username) =>
  `SELECT * FROM users WHERE username = $(username)`;


// change user details    (by name)
exports.UPDATE_USER = (username, email, password) =>
  `UPDATE users SET 
    username = $(username), 
    email = $(email), 
    password = $(password) 
  WHERE username = $(username)`;


// delete user            (by name)
exports.DELETE_USER = (username) =>
  `DELETE FROM users WHERE username = $(username)`;