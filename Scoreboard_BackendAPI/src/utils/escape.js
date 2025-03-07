import { escape } from 'mysql';

/**
 * Escape all request body values to protect from SQL injection
 *    adds an additional layer of quotes around the value
 *        to enforce type is purely a string
 *
 *  @example
 * {
 *    username: 'admin',
 *    password: 'password'
 *    email: 'admin@example.com'
 * }
 * 
 * result:
 * {
 *  username: "'admin'",
 *  password: "'password'",
 *  email:    "'admin@example.com'"
 * }
 * 
 * 
 * @param {object} body - The request body
 * @returns {object} - The escaped request body
 */
export default (body) => {
  return Object.keys(body).reduce((acc, key) => {
    acc[key] = escape(body[key]).slice(1, -1);
    return acc;
  }, {});
};