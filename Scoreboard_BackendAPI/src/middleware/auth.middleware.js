// import
import { 
        jwtconfig, 
        verifyToken } from '../utils/jwt-helpers';
  
  // export validation middleware
  export default (req, res, next) => {
    // pull token from request header
    const authHeader = req.headers['auth-token'] || req.headers['authorization'];
  
    if (!authHeader) {
      // stop user authentication if no token
      res
        // build response 
        .status(401)
        .send({ auth: false, msg: 'access denied, no token provided' });
    }
  
    const accessToken = authHeader.split(' ')[1];

    try {
      // verify token
      const user = verifyToken(accessToken, jwtconfig.access, req, res); 
      req.user = user;
      next();
    } catch (err) {
      res
        // build response
        .status(403)
        .json({ msg: 'invalid token' });
    }
  };