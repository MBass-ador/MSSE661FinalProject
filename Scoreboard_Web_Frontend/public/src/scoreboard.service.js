import { _get } from './service-helpers.js';

// define "scoreboard" API endpoint  // http://localhost:3000/api/scoreboard
const SCOREBOARD_API = `${BASE_API_URL}/scoreboard`; 


/**
 * Fetches the Scoreboard Data from the API
 * 
 * @returns {Promise<Object>} - The JSON response from the server
 */
export const getScoreboard = () => _get(SCOREBOARD_API);