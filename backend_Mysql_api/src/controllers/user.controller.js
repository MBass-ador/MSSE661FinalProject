const bcrypt = require('bcrypt');

const connection = require('../db_config');

const query = require('../utils/query');

const {
  GET_USER_BY_NAME,
  GET_USER_WITH_PASSWORD_BY_NAME
} = require('../queries/user.queries');

const { UPDATE_USER } = require('../queries/auth.queries');


// get user by name
exports.getMe = async (req, res) =>{
  // verify token
  const decoded = req.user;

  // result of middleware check
  if(decoded.name) {
    // make connection
    const con = await connection().catch((err) => {
      throw err;
    }
  );

  const user = await query(con, GET_USER_BY_NAME, [decoded.name]).catch(
    (err) => {
      res.status(500);
      res.send({ msg: 'no user with that name' });
    }
  );

  if (!user.length) {
    res.status(400);
    res.send({ msg: 'no user found' });
  }
  res.status(200).send(user);
  }  
};


// update user (identified by name)
exports.updateUser = async (req, res) => {
  // connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // check for existing user
  const user = await query(con, GET_USER_WITH_PASSWORD_BY_NAME, [req.user.name]).catch(
    (err) => {
      res.status(500);
      res.send({ msg: 'no user with that name' });
  });

  const passwordUnchanged = await bcrypt
    .compare(req.body.password, user[0].password)
    .catch((err) => {
      res.json(500).json({ msg: 'password comparison failed' });
    });

  if (!passwordUnchanged) {
    const passwordHash = bcrypt.hashSync(req.body.password);
    
    // do update
    const result = await query(con, UPDATE_USER, [
      req.body.username,
      req.body.email,
      passwordHash,
      user[0].user_id
    ]).catch((err) => {
      res.status(500);
      res.send({ msg: 'user update failed' });
    });

    if (result.affectedRows === 1) {
      res.json({ msg: 'user updated' });
    }
    res.json({ msg: 'user not updated' });
  }
};