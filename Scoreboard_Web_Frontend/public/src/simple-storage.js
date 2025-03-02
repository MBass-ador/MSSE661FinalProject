// local browser data functions


/**
 *   Sets Data in Browser Storage
 * 
 * @param {String} key   - key to store data with
 * @param {Object} data  - json data to store
 */
export const setStorage = (key, data) => {
  // convert data to string
  const dataAsString = JSON.stringify(data);
  // encode data
  const encodedData = btoa(dataAsString);
  // store data in browser under key: encodedData
  localStorage.setItem(key, encodedData);
};
  

/**
 *  Gets Data from Browser Storage
 * 
 * @param {String} key  -   key where data stored in browser
 * @returns {Object}    -   data from browser or null
 */
export const getStorage = (key) => {
  const encodedData = localStorage.getItem(key);
    
  if (!encodedData) {
    return null;
  }

  const decodedData = atob(encodedData);

  return JSON.parse(decodedData);
};
  

/**
 *  Clears Data from Browser Storage
 *  by Key
 * 
 * @param {String} key  - key of data to clear
 *                        from browser storage
 */
export const clearStorage = (key) => {
  localStorage.removeItem(key);
};
  

/**
 * Checks whether Browser Storage has Data
 * 
 * @returns {Boolean}  -  true if data exists
 *                        false if no data
 */
export const storageHasData = () => localStorage.length > 0;