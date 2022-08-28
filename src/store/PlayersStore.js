import {makeAutoObservable, configure} from 'mobx';
import {callRemoteMethod} from '../Utility/webserviceHandler';
configure({
  enforceActions: 'never',
});
class PlayersStore {
  playersArray = [];
  matchData = null;
  MyTeams = [];
  team_One_Array = [];
  team_Two_Array = [];
  teams_Name = [];
  total_Batsman = [];
  total_WK = [];
  total_AllRounders = [];
  total_Bowler = [];
  selectedPlayers = [];

  constructor() {
    makeAutoObservable(this, {}, {autoBind: true});
  }

  async getPlayersData() {
    const response = await callRemoteMethod(
      'https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json',
    );
    console.log(response, 'getPlayersData');
    this.playersArray = response;
    this.team_One_Array = response.filter(
      item => item.team_short_name !== 'MS',
    );
    this.team_Two_Array = response.filter(
      item => item.team_short_name !== 'PS',
    );
    this.total_Batsman = response.filter(item => item.role === 'Batsman');

    this.total_WK = response.filter(item => item.role === 'Wicket-Keeper');
    this.total_AllRounders = response.filter(
      item => item.role === 'All-Rounder',
    );
    this.total_Bowler = response.filter(item => item.role === 'Bowler');
  }

  async getMatchData() {
    const response = await callRemoteMethod(
      'https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_upcoming_Matches.json',
    );
    this.matchData = response;
    console.log(response, 'getMatchData');

    return response;
  }
}

export default new PlayersStore();
