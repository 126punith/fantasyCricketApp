import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import GlobalStyles from '../Utility/GlobalStyles';
import {observer} from 'mobx-react-lite';
import PlayersStore from '../store/PlayersStore';
import colorCode from '../Utility/ColorCode';
import {SCREENS} from '../Utility/Constants';
import MatchsBoard from '../components/MatchsBoard';

const MatchesScreen = props => {
  const {
    matchData,
    getMatchData,
    t1_image,
    t2_image,
    event_name,
    t1_short_name,
    t2_short_name,
    getPlayersData,
  } = PlayersStore;
  const {navigation} = props;

  const getData = async () => {
    const matchResponse = await getMatchData();
    await getPlayersData();

    console.log(matchResponse, 'playersResponse');
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(matchData, 'Match Info');

  return (
    <SafeAreaView>
      <View style={[GlobalStyles.alignCenter]}>
        <View style={[styles.title, GlobalStyles.alignCenter]}>
          <Text style={styles.titleText}>Upcoming Matches</Text>
        </View>
        <MatchsBoard
          t1_image={t1_image}
          t2_image={t2_image}
          event_name={event_name}
          t1_short_name={t1_short_name}
          t2_short_name={t2_short_name}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

export default observer(MatchesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    width: '90%',
  },
  titleText: {
    fontWeight: '600',
    fontSize: 30,
  },
  matchsContainer: {
    width: '85%',
    height: 120,
    borderWidth: 2,
    borderColor: colorCode.midnightBlue,
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  eventText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 5,
  },
  versusText: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
  subText: {
    fontSize: 11,
    color: '#8a8c89',
  },
});
