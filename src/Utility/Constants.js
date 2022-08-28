import ENV from './Eniviroment';
module.exports = {
  SCREENS: {
    MATCHES: 'Matches',
    MY_TEAM: 'MyTeam',
    PICK_PLAYERS: 'PickPlayers',
    SAVE_MY_TEAM: 'SaveMyTeam',
  },
  URL: {
    PLAYERS: `${ENV.API_HOST}/task/fantasy-sports/Get_All_Players_of_match.json`,
    MATCHES: `${ENV.API_HOST}/task/fantasy-sports/Get_All_upcoming_Matches.json`,
  },
};
