// define "scoreboard" API endpoint  // http://localhost:3000/api/scoreboard
const SCOREBOARD_API = `${BASE_API_URL}/scoreboard`; 

const getScoreboard = () => _get(SCOREBOARD_API);