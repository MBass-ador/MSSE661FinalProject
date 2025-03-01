//imports
import connection from '../db_config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import query from '../utils/query.js';

import {
    GET_USER_BY_NAME,
    GET_USER_WITH_PASSWORD_BY_NAME,
    INSERT_NEW_USER
} from '../queries/user.queries.js';

import {
  refreshTokens,
  generateAccessToken,
  generateRefreshToken,
}  from '../utils/jwt-helpers.js';

// function to register new user
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
                .json({msg: 'error polling db'});
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