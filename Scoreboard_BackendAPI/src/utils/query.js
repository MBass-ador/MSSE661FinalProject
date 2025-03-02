/**
 *       making promise-wraped query function for mysql
 * 
 * @param   {Object} con    - The database connection object.
 * @param   {String} query  - The SQL query string.
 * @param   {Array} params  - The parameters for the SQL query.
 * @returns {Promise}       - A promise 
 *                              that resolves with the query result 
 *                                  or rejects with an error.
 */
export default async function query(con, query, params) {
  return new Promise((resolve, reject) => {
    con.query(query, params, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
}