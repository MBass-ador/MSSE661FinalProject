import plugin from 'jsonwebtoken';
const { sign, 
        verify } = plugin;

// jwt secrets for initial and refresh tokens
const jwtconfig = {
    access: 'supersecretaccesssecret',
    refresh: 'megasecretrefreshsecret',
  };

  // array storage for refresh tokens 
  // (multiple user's tokens)
const refreshTokens = [];

// create a new auth token
const generateAccessToken = (id, expiresIn) =>
    sign({ id }, jwtconfig.access, expiresIn);

// create a new refresh token
const generateRefreshToken = (id, expiresIn) =>
    sign({ id }, jwtconfig.refresh, expiresIn);

// function to check if token is valid
const verifyToken = (token, secret, req, res) => {
    try {
      return verify(token, secret);
    } catch {
      res.status(500).send({ auth: false, message: 'Invalid token.' });
    }
  };

// export jwt helpers
export {
    jwtconfig,
    refreshTokens,
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
  };