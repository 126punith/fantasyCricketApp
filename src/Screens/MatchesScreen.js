import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import GlobalStyles from '../Utility/GlobalStyles';
import {observer} from 'mobx-react-lite';
import PlayersStore from '../store/PlayersStore';
import colorCode from '../Utility/ColorCode';
import {SCREENS} from '../Utility/Constants';
import MatchsBoard from '../components/MatchsBoard';

const MatchesScreen = props => {
  const {matchData, getMatchData} = PlayersStore;
  const {navigation} = props;

  const getData = async () => {
    // const playersResponse = await getPlayersData();
    const matchResponse = await getMatchData();

    console.log(matchResponse, 'playersResponse');
  };
  useEffect(() => {
    getData();
  }, []);

  console.log(matchData, 'Match Info');
  const {t1_image, t2_image, event_name, t1_short_name, t2_short_name} =
    matchData?.matches?.cricket[0];
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
        {/* <TouchableOpacity
          style={styles.matchsContainer}
          onPress={() => {
            console.log(navigation.navigate(SCREENS.MY_TEAM));
          }}>
          <Image
            source={{
              uri: t1_image,
            }}
            style={styles.image}
          />
          <View>
            <Text style={styles.eventText}>{event_name}</Text>
            <Text style={styles.versusText}>
              {t1_short_name} <Text style={styles.subText}>vs</Text>{' '}
              {t2_short_name}
            </Text>
          </View>
          <Image
            source={{
              uri: t2_image,
            }}
            style={styles.image}
          />
        </TouchableOpacity> */}
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
