const escape = require('mysql2').escape;

/**
 * Escape all request body values to protect from SQL injection
 *
 * @param {object} body - The request body
 * @returns {object} - The escaped request body
 */
module.exports = (body) => {
  return Object.keys(body).reduce((acc, key) => {
    acc[key] = escape(body[key]);
    return acc;
  }, {});
};