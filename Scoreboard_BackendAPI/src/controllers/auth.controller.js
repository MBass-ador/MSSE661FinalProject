//imports
import connection from '../db_config.js';
import bcrypt from 'bcryptjs';
import query from '../utils/query.js';

import {
    GET_USER_BY_NAME,
    GET_USER_WITH_PASSWORD_BY_NAME,
    INSERT_NEW_USER
} from '../queries/user.queries.js';

import {
    jwtconfig,
    refreshTokens,
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
}  from '../utils/jwt-helpers.js';



/**
 *      Register a New User
 * 
 * @param {Object} req   -  Request Object
 * @param {Object} res   -  Response Object
 * @returns              -  JSON: Response / Error
 */
export const register = async (req, res) => {

    // destructure request body
    const { 
        username, 
        email, 
        password } = req.body;

    console.log('Received data:', { username, email, password });

    // make async connection
    const con = await connection()
    .catch((err) => {
        throw err;;
    });

    // check if user already exists
    try {
        const existingUser = await query(
            con,
            GET_USER_BY_NAME(),
            [username] // pass as array
        );

        if (existingUser.length > 0) {
            return res  // username already exists
                    .status(400)
                    .json({msg: 'user already exists',});
        }
    } catch (error) {
        console.error(error);
        return res  // can't get response from db
                .status(500)
                .json({msg: 'error checking db for user'});
    }

    // hash password
    const saltRounds = 10;
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.error('error hashing password:', error);
        return res  // sadness :(
                .status(500)
                .json({ msg: 'error hashing password' });
    }

    // create new user
    try {
        await query(con, INSERT_NEW_USER(), [username, email, hashedPassword]);
        return res  // success :)
                .status(201)
                .json({ msg: 'user created successfully' });
    } catch (error) {
        console.error(error);
        return res  // sadness :(
                .status(501)
                .json({ msg: 'error saving to db'  });
    }
}

/**
 *      Login Registered User 
 * 
 * @param {Object} req    -  Request Object
 * @param {Object} res    -  Response Object
 * @returns               -  JSON: Response / Error
 */
export const login = async (req, res) => {
    // extract username and password from request body
    const { 
        username, 
        password } = req.body;
    
    // make async connection
    const con = await connection()
    .catch((err) => {
        throw err;
    });

    // check for existing user
    try {
        const existingUser = await query(
            con,
            GET_USER_WITH_PASSWORD_BY_NAME(),
            [username] // pass as array
        );
        console.log( 'db reports: user found' );
        
        if (existingUser.length > 0) {
            // check for matching password
            try {
                const validPass = await bcrypt
                    .compare(password, existingUser[0].password);

                // if passwords do not match
                if (!validPass) {
                    return res  // return error
                        .status(400)
                        .json({ msg: 'invalid password for specified user' });
                } else {
                // if passwords DO match
                // create jwt tokens
                const accessToken  = generateAccessToken(existingUser[0],  {expiresIn: 86400} );
                const refreshToken = generateRefreshToken(existingUser[0], {expiresIn: 86400} );

                // add refresh token to server side active token array
                refreshTokens.push(refreshToken);

                console.log('added refresh token:\n', refreshToken, '\n');
                console.log('Current refresh tokens:\n', refreshTokens.join('\n'), '\n');

                // build response, including tokens
                return res
                    .header('auth-token', accessToken)
                    .json({
                        auth: true,
                        msg: 'user authenticated successfully',
                        token_type: 'bearer',
                        access_token: accessToken,
                        expires_in: 86400,
                        refresh_token: refreshToken
                    })
                }
            } catch (error) {
                console.error('error comparing passwords:', error);
                return res
                    .status(500)
                    .json({ msg: 'error attempting to match passwords' });
            }
        } else {
            return res  // user does not exist
                    .status(400)
                    .json({msg: 'db returned: user not found',});
        }
    } catch (err) {
        console.error('error checking DB for user:', err);
        return res
                .status(500)
                .json({ msg: 'error checking db for user' });
    }
}

/**
 *    Log Out Logged In User
 * 
 * @param {Object} req   - Request Object
 * @param {Object} res   - Response Object
 * @returns              - JSON: Response / Error
 */
export const logout = async (req, res) => {
    // Pull refresh token from request body
    const refresh_token = req.body.refresh_token;

    // if no token extracted
    if (!refresh_token) {
        return res.status(400).json({ error: 'no refresh token found in request' });
    }

    console.log('received refresh token:\n', refresh_token, '\n');
    console.log('current refresh tokens:\n', refreshTokens.join('\n'), '\n');

    // Remove refresh token from active tokens array
    try {
        const index = refreshTokens.indexOf(refresh_token);
        if (index > -1) {
            refreshTokens.splice(index, 1);
        }
        console.log('updated refresh tokens:\n', refreshTokens.join('\n'), '\n');
        return res
            .status(200)
            .json({ msg: 'user logged out successfully' });
    } catch (error) {
        console.error('error removing refresh token from server storage:', error);
        return res
            .status(500)
            .json({ error: 'error removing refresh token from server storage' });
    }
};


/**
 *    Refreshes Access Token
 * 
 * @param {Object} req   - Request Object
 * @param {Object} res   - Response Object
 * @returns              - JSON: Response / Error
 */
export const token = async (req, res) => {
    // Pull refresh token from request body
    const refresh_token = req.body.refresh_token;

    // if no token extracted
    if (!refresh_token) {
        return res
                .status(400)
                .json({ error: 'no refresh token found in request' });
    }

    console.log('received refresh token:\n', refresh_token, '\n');
    console.log('current refresh tokens:\n', refreshTokens.join('\n'), '\n');

    // Check if the refresh token is in the active tokens array
    if (!refreshTokens.includes(refresh_token)) {
        return res
                .status(403)
                .json({ error: 'invalid refresh token' });
    }

    // Verify the refresh token
    try {
        const decoded = verifyToken(refresh_token, jwtconfig.refresh);
        console.log('decoded refresh token:\n', decoded, '\n');

        // Generate a new access token
        const accessToken = generateAccessToken(decoded, { expiresIn: 86400 });

        return res
                .status(200)
                .json({
                        auth: true,
                        msg: 'access token refreshed successfully',
                        token_type: 'bearer',
                        access_token: accessToken,
                        expires_in: 86400
                });

    } catch (error) {
        console.error('error verifying refresh token:', error);
        return res
                .status(403)
                .json({ error: 'invalid refresh token' });
    }

}