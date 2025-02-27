//imports
const bcrypt = require('bcryptjs');

const connection = require('../db_config');

const {
  GET_USER_BY_NAME,
  GET_USER_WITH_PASSWORD_BY_NAME,
  INSERT_NEW_USER
} = require('../queries/user.queries');

const query = require('../utils/query');

const {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/jwt-helpers');

const escape = require('../utils/escape');


// function to set up new user
exports.register = async (req, res) => {
  // set parameters
  const passwordHash = bcrypt.hashSync(req.body.password, 10);
  const { username, email, password } = escape({
    ...req.body,
    password: passwordHash
  });

  // make connection
  const con = await connection().catch((err) => {
    res.status(500).send({ msg: 'Database connection error' });
    return;
  });

  // check if user already exists
  const user = await query(con, GET_USER_BY_NAME(username)).catch((err) => {
    console.log(err);
    res.status(500).json({ msg: 'Could not retrieve user.' });
  });
  

  // if single response
  if (user != undefined && user.length === 1) {
    res
      .status(403)
      .send({ msg: 'user already exists' });
  } else {
    // add new user
    const result = await query(con, INSERT_NEW_USER(username, email, password) ).catch((err) => {
      //   stop registeration
      res
        .status(500)
        .send({ msg: 'unable to register user, please try again' });
    });

    // if one result
    if (result.affectedRows === 1) {
    res.send({ msg: 'new user created' });
    }
  }

};


// function to log in user
exports.login = async (req, res) => {
  // establish a connection
  const con = await connection().catch((err) => {
    throw err;
  });

  // check for existing user first
  const user = await query(con, GET_USER_WITH_PASSWORD_BY_NAME, [
    req.body.username,
  ]).catch((err) => {
    res
      .status(500)
      .send({ msg: 'unable to retrieve user' });
  });

  // if the user exists (one instance matches criteria)
  if (user.length === 1) {
    //   compare entered password with saved password from db
    const validPass = await bcrypt
      .compare(password, user[0].password)
      .catch((err) => {
        res.json(500).json({ msg: 'invalid password!' });
      });

    if (!validPass) {
      res.status(400).json({ msg: 'invalid password!' });
    }
    // create token
    const accessToken = generateAccessToken(user[0].user_id, {
      expiresIn: 86400,
    });
    const refreshToken = generateRefreshToken(user[0].user_id, {
      expiresIn: 86400,
    });

    refreshTokens.push(refreshToken);

    res
      .header('access_token', accessToken) // ex.: { 'aut-token': 'lksnenha0en4tnoaeiwnlgn3o4i'}
      .json({
        auth: true,
        msg: 'logged in',
        token_type: 'bearer',
        access_token: accessToken,
        expires_in: 86400,
        refresh_token: refreshToken
      });
  } else {
    res
      .status(401)
      .json({ auth: false, msg: 'invalid username/password combination' });
  }
};


// function to refresh access token
exports.token = (req, res) => {
  const refreshToken = req.body.token;

   // stop user auth validation if no token
   if (!refreshToken) {
    res
      .status(401)
      .json({ auth: false, msg: 'access denied, no valid token.' });
  }

  // stop refresh if refresh token mising
  if (!refreshTokens.includes(refreshToken)) {
    res.status(403).json({ msg: 'invalid refresh token' });
  }

  const verified = verifyToken(refreshToken, jwtconfig.refresh, req, res);

  if (verified) {
    const accessToken = generateToken(user[0].user_id, { expiresIn: 86400 });
    res
      .header('access_token', accessToken) // ex.: { 'aut-token': 'lksnenha0en4tnoaeiwnlgn3o4i'}
      .json({
        auth: true,
        msg: 'logged in',
        token_type: 'bearer',
        access_token: accessToken,
        expires_in: 20,
        refresh_token: refreshToken,
      });
  }
  // if not verified
  res.status(403).send({ msg: 'invalid token' });
};


// function to log out user
exports.logout = (req, res) => {
  const refreshToken = req.body.token;
  // remove token from refreshTokens
  refreshTokens = refreshTokens.filter((t) => t !== refreshToken);

  res.json({ msg: 'logout successful' });
};
