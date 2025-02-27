// import
const { 
  jwtconfig, 
  verifyToken } = require('../utils/jwt-helpers');

// export validation middleware
module.exports = (req, res, next) => {
  // pull token from request header
  const authHeader = req.headers['auth-token'] || req.headers['authorization'];
  const accessToken = authHeader.split(' ')[1];

  if (!accessToken) {
    // stop user authentication if no token
    res
      // build response 
      .status(401)
      .send({ auth: false, msg: 'access denied, no token provided' });
  }

  try {
    // verify token
    const user = verifyToken(accessToken, jwtconfig.access, req, res); 
    req.user = user;
    next();
  } catch (err) {
    res
      // build response
      .status(403)
      .send({ msg: 'invalid token' });
  }
};
