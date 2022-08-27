import {makeAutoObservable, configure} from 'mobx';
import {callRemoteMethod} from '../Utility/webserviceHandler';
configure({
  enforceActions: 'never',
});
class PlayersStore {
  playersArray = [];
  matchData = null;
  MyTeams = [];

  constructor() {
    makeAutoObservable(this, {}, {autoBind: true});
  }

  async getPlayersData() {
    const response = await callRemoteMethod(
      'https://leaguex.s3.ap-south-1.amazonaws.com/task/fantasy-sports/Get_All_Players_of_match.json',
    );
    console.log(response, 'getPlayersData');
    this.playersArray = response;
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
