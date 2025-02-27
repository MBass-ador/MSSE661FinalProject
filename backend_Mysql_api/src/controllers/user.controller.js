const bcrypt = require('bcryptjs');

const connection = require('../db_config');

const query = require('../utils/query');

const {
  GET_USER_BY_NAME,
  GET_USER_WITH_PASSWORD_BY_NAME,
  UPDATE_USER,
  DELETE_USER
} = require('../queries/user.queries');

const { serverError } = require("../utils/handlers");


// get user by name
exports.getUser = async (req, res) =>{
  // get user from request
  const user = req.user;

  // if username in request
  if(user.username) {
    // make connection
    const con = await connection().catch((err) => {
      throw err;
    }
  );

  const user = await query(con, GET_USER_BY_NAME(user.username) )
  .catch((serverError(res)));

  if (!user.length) {
    res
      .status(400)
      .send({ msg: 'no user found' });
  }
  res.json(user);
  }  
};


// update user (identified by name)
exports.updateUser = async (req, res) => {
  // connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // check for existing user
  const user = await query(con, GET_USER_WITH_PASSWORD_BY_NAME(req.user.username) )
  .catch(serverError(res));

  const validPass = await bcrypt
    .compare(req.body.password, user[0].password)
    .catch(serverError(res));

  // if new and old password are different
  if (!validPass) {
    const passwordHash = bcrypt.hashSync(req.body.password);
    
    // do update
    const result = await query(con, UPDATE_USER, [
      req.body.username,
      req.body.email,
      passwordHash,
      user[0].user_id
    ]).catch(serverError(res));

    // check outcome
    if (result.affectedRows === 1) {
      // if successful (1 row updated)
      res.json({ msg: 'user details updated successfully' });
    } else {
    // if more or less than 1 row modified
    // presumably can only be 1 or 0
    res.json({ msg: `unable to update ${req.body.username}'s data` });
    }
  }
};

// delete user (identified by name)
exports.deleteUser = async function (req, res) {
  // connection
  const con = await connection().catch((err) => {
    throw err;
  });
  
  // check for existing user
  const user = await query(con, GET_USER_WITH_PASSWORD_BY_NAME, [req.user.username]).catch(
    (err) => {
      res.status(500);
      res.send({ msg: 'no user with that name' });
  });

  // do delete
  const result = await query(con, DELETE_USER, [user[0].username]).catch((err) => {
    res.status(500);
    res.send({ msg: 'user deletion failed' });
  });

  // check outcome
  if (result.affectedRows === 1) {
    // if successful (1 row updated)
    res.json({ msg: `${req.user.username} deleted` });
  }
  // if more or less than 1 row modified
  // presumably can only be 1 or 0
  res.json({ msg: 'user not deleted' });

};