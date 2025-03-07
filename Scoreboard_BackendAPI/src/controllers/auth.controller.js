//imports
import connection from '../db_config.js';
import bcrypt from 'bcryptjs';
import query from '../utils/query.js';
import escape from '../utils/escape.js';

import {
    GET_USER_BY_NAME,
    GET_USER_WITH_PASSWORD_BY_NAME,
    INSERT_NEW_USER,
    UPDATE_USER,
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
    console.log('Received registration request:', req.body);
    // hash password
    const saltRounds = 10;
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    } catch (error) {
        console.error('error hashing password:', error);
        return res  // sadness :(
                .status(500)
                .json({ msg: 'error hashing password' });
    }
    console.log('hashed password:', hashedPassword);

    // destructure and escape request body
    const { 
        username, 
        email,
        password } = escape({
            ...req.body,
            password: hashedPassword
          });

    console.log('received data:', { username, email, password });

    // Check if all required fields are present
    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    // make async connection
    const con = await connection()
    .catch((err) => {
        console.error('error connecting to the database:', err);
        return res.status(500).json({ msg: 'error connecting to the database' });
    });

    // check if user already exists
    try {
        const existingUser = await query(
            con,
            GET_USER_BY_NAME(),
            [username] // pass as array
        );

        if (existingUser.length > 0) {
            console.log('User already exists:', username);
            
            return res  // username already exists
                    .status(403)
                    .json({msg: 'user already exists',});
        }
    } catch (error) {
        console.error("error checking db for user", error);
        return res  // can't get response from db
                .status(500)
                .json({msg: 'error checking db for user'});
    }

    // create new user
    try {
        await query(con, INSERT_NEW_USER(), [username, email, hashedPassword]);
        
        console.log('User created successfully:', username);
        
        return res  // success :)
                .status(201)
                .json({ msg: 'user created successfully' });
    } catch (error) {
        console.error("error saving to db", error);
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
    console.log('received login request:', req.body);
    // extract username and password from request body
    const { 
        username, 
        password } = escape(req.body);
        console.log('escaped data:', { username, password });

    // make async connection
    const con = await connection()
    .catch((err) => {
        console.error('error connecting to the database:', err);
        return res.status(500).json({ msg: 'error connecting to the database' });
    });

    // check for existing user
    try {
        const existingUser = await query(
            con,
            GET_USER_WITH_PASSWORD_BY_NAME(),
            [username] // pass as array
        );
        console.log( 'found existing user:', existingUser[0] );
        
        if (existingUser.length > 0) {
            // check for matching password
            try {
                const validPass = await bcrypt
                    .compare(password, existingUser[0].password);

                // if passwords do not match
                if (!validPass) {
                    return res  // return error
                        .status(401)
                        .json({ msg: 'invalid password for specified user' });
                } else {
                // if passwords DO match
                // create jwt tokens
                const accessToken  = generateAccessToken(existingUser[0],  {expiresIn: 86400} );
                const refreshToken = generateRefreshToken(existingUser[0], {expiresIn: 86400} );

                // add refresh token to server side active token array
                refreshTokens.push(refreshToken);

                //console.log('added refresh token:\n', refreshToken, '\n');
                //console.log('Current refresh tokens:\n', refreshTokens.join('\n'), '\n');

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
                    .status(404)
                    .json({msg: 'db returned: user not found',});
        }
    } catch (err) {
        
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

    //console.log('received refresh token:\n', refresh_token, '\n');
    //console.log('current refresh tokens:\n', refreshTokens.join('\n'), '\n');

    // Remove refresh token from active tokens array
    try {
        const index = refreshTokens.indexOf(refresh_token);
        if (index > -1) {
            refreshTokens.splice(index, 1);
        }
        //console.log('updated refresh tokens:\n', refreshTokens.join('\n'), '\n');
        return res
            .status(200)
            .json({ msg: 'user logged out successfully' });
    } catch (error) {
        //console.error('error removing refresh token from server storage:', error);
        return res
            .status(500)
            .json({ error: 'error removing refresh token from server storage' });
    }
};

/**
 * Update User Details
 *
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 * @returns - JSON: Response / Error
 */
export const updateUser = async (req, res) => {
    
    // hash password
    const saltRounds = 10;
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    } catch (error) {
        console.error('error hashing password:', error);
        return res  // sadness :(
                .status(500)
                .json({ msg: 'error hashing password' });
    }
    console.log('hashed password:', hashedPassword);

    // destructure and escape request body
    const { 
        username,
        newUsername, 
        email,
        password } = escape({
            ...req.body,
            password: hashedPassword
          });
    
    
    //const { username, newUsername, email, password } = escape(req.body);

    // make async connection
    const con = await connection().catch((err) => {
        console.error('error connecting to the database:', err);
        return res.status(500).json({ msg: 'error connecting to the database' });
    });

    // update user details
    try {
        await query(con, UPDATE_USER(), [newUsername, email, password, username]);
        console.log('user updated successfully:', { newUsername, email } + "password: protected");
        return res.status(202).json({ msg: 'user updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ msg: 'error updating user' });
    }
};


/**
 *    Refreshes Access Token
 * 
 * @param {Object} req   - refresh token
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

    //console.log('received refresh token:\n', refresh_token, '\n');
    //console.log('current refresh tokens:\n', refreshTokens.join('\n'), '\n');

    // Check if the refresh token is in the active tokens array
    if (!refreshTokens.includes(refresh_token)) {
        return res
                .status(403)
                .json({ error: 'invalid refresh token' });
    }

    // Verify the refresh token
    try {
        const decoded = verifyToken(refresh_token, jwtconfig.refresh);
        //console.log('decoded refresh token:\n', decoded, '\n');

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
        //console.error('error verifying refresh token:', error);
        return res
                .status(403)
                .json({ error: 'invalid refresh token' });
    }

}