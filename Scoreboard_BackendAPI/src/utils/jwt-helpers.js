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
const generateAccessToken = (id, options) =>
    sign({ id }, jwtconfig.access, options);

// create a new refresh token
const generateRefreshToken = (id, options) =>
    sign({ id }, jwtconfig.refresh, options);

// function to check if token is valid
const verifyToken = (token, secret) => {
  try {
      return verify(token, secret);
  } catch (error) {
      throw new Error('Invalid token');
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