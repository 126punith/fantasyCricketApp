import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SCREENS} from '../Utility/Constants';
import PlayersStore from '../store/PlayersStore';
import CustomButton from '../components/CustomButton';
import {observer} from 'mobx-react-lite';
const {height: deviceHeight} = Dimensions.get('window');

const PickPlayerScreen = props => {
  const {getPlayersData, playersArray} = PlayersStore;

  const {route, navigation} = props;
  // console.log(props, 'props');

  const getPlayersHandler = async () => {
    await getPlayersData();

    // console.log(Players, 'playersResponse');
  };
  const [numbersOfBatsman, setNumbersOfBatsman] = useState(0);
  const [numbersOfBowlers, setNumbersOfbowlers] = useState(0);
  const [numbersOfWC, setNumbersOfWC] = useState(0);
  const [numbersOfAll, setNumbersOfAll] = useState(0);
  const [credits, setCredits] = useState(100);
  const [teamOne, setTeamOne] = useState(0);
  const [teamTwo, setTeamTwo] = useState(0);
  const [players, setPlayers] = useState({
    teamNumber: 1,
    playerData: [],
  });

  useEffect(() => {
    getPlayersHandler();
    console.log('players array working', players);
  }, [players]);

  const TOTAL_PLAYERS = 11;
  const {t1_short_name, t2_short_name} = route.params;

  const showAlert = msg => {
    Alert.alert(msg);
  };

  const playerHandler = itemData => {
    const numOfPlayers = players?.playerData.filter(
      item => item.role === itemData.role,
    ).length;
    console.log(numOfPlayers, 'punith');
    if (players.playerData.length > 10) {
      showAlert('select only 11 players');
      return;
    }
    if (itemData.role === 'Batsman' && numOfPlayers > 6) {
      showAlert('select 3-7 Batsman');
      return;
    }
    if (itemData.role === 'Bowler' && numOfPlayers > 6) {
      showAlert('select 3-7 Bowlers');
      return;
    }
    if (itemData.role === 'Wicket-Keeper' && numOfPlayers > 4) {
      showAlert('select 1-5 Wicket Keepers');
      return;
    }
    if (itemData.role === 'All-Rounder' && numOfPlayers > 3) {
      showAlert('select 0-4 All Rounder');
      return;
    }

    setPlayers(prev => ({
      ...prev,
      playerData: [...prev.playerData, itemData],
    }));

    if (itemData.role === 'Batsman') {
      setNumbersOfBatsman(numOfPlayers + 1);
      setCredits(prev => prev - itemData.event_player_credit);
      if (itemData.team_short_name === t1_short_name) {
        setTeamOne(prev => prev + 1);
      } else {
        setTeamTwo(prev => prev + 1);
      }
    } else if (itemData.role === 'Bowler') {
      setNumbersOfbowlers(numbersOfBowlers + 1);
      setCredits(prev => prev - itemData.event_player_credit);
      if (itemData.team_short_name === t1_short_name) {
        setTeamOne(prev => prev + 1);
      } else {
        setTeamTwo(prev => prev + 1);
      }
    } else if (itemData.role === 'Wicket-Keeper') {
      setNumbersOfWC(numbersOfWC + 1);
      setCredits(prev => prev - itemData.event_player_credit);
      if (itemData.team_short_name === t1_short_name) {
        setTeamOne(prev => prev + 1);
      } else {
        setTeamTwo(prev => prev + 1);
      }
    } else if (itemData.role === 'All-Rounder') {
      setNumbersOfAll(numbersOfAll + 1);
      setCredits(prev => prev - itemData.event_player_credit);
      if (itemData.team_short_name === t1_short_name) {
        setTeamOne(prev => prev + 1);
      } else {
        setTeamTwo(prev => prev + 1);
      }
    }
  };

  const totalNumberOfPlayers = players?.playerData.length;

  const removePlayerHandler = itemData => {
    const newPlayerData = players.playerData.filter(
      item => itemData.id !== item.id,
    );

    setPlayers(prev => ({...prev, playerData: newPlayerData}));

    if (itemData.role === 'Batsman') {
      setNumbersOfBatsman(prev => prev - 1);
      setCredits(prev => prev + itemData.event_player_credit);
      if (itemData.team_short_name === t1_short_name) {
        setTeamOne(prev => prev - 1);
      } else {
        setTeamTwo(prev => prev - 1);
      }
    } else if (itemData.role === 'Bowler') {
      setNumbersOfbowlers(prev => prev - 1);
      setCredits(prev => prev + itemData.event_player_credit);
      if (itemData.team_short_name === t1_short_name) {
        setTeamOne(prev => prev - 1);
      } else {
        setTeamTwo(prev => prev - 1);
      }
    } else if (itemData.role === 'Wicket-Keeper') {
      setNumbersOfWC(prev => prev - 1);
      setCredits(prev => prev + itemData.event_player_credit);
      if (itemData.team_short_name === t1_short_name) {
        setTeamOne(prev => prev - 1);
      } else {
        setTeamTwo(prev => prev - 1);
      }
    } else if (itemData.role === 'All-Rounder') {
      setNumbersOfAll(prev => prev - 1);
      setCredits(prev => prev + itemData.event_player_credit);
      if (itemData.team_short_name === t1_short_name) {
        setTeamOne(prev => prev - 1);
      } else {
        setTeamTwo(prev => prev - 1);
      }
    }
  };

  const proceedHandler = () => {
    const checkTeamNum1 = players.playerData.filter(
      item => item.team_short_name === t1_short_name,
    ).length;
    const checkTeamNum2 = players.playerData.filter(
      item => item.team_short_name === t2_short_name,
    ).length;
    console.log(
      ` checknum1 = ${checkTeamNum1} ,checkTeamNum2 = ${checkTeamNum2} `,
    );
    if (players.playerData.length < 11) {
      showAlert(` select max 11 players `);
      return;
    }
    if (players.playerData.length > 11) {
      showAlert(` select min 11 players `);
      return;
    }
    if (checkTeamNum1 > 7) {
      showAlert(`You can select only max 7 ${t1_short_name} `);
      return;
    } else if (checkTeamNum2 > 7) {
      showAlert(`You can select only max 7 ${t2_short_name} `);
      return;
    }
    if (numbersOfBatsman < 3) {
      showAlert('select 3-7 Batsman');
      return;
    }
    if (numbersOfBowlers < 3) {
      showAlert('select 3-7 Bowlers');
      return;
    }
    if (numbersOfWC < 1) {
      showAlert('select 1-5 Wicket Keepers');
      return;
    }
    if (credits < 0) {
      alert("You don't have enough credits");
      return;
    }

    console.log('perfect array', players?.playerData);
    navigation.navigate(SCREENS.SAVE_MY_TEAM, {
      players,
      t1_short_name,
      t2_short_name,
    });
  };

  return (
    <>
      <SafeAreaView />
      <View style={styles.mainTitileContainer}>
        <Text style={styles.titleText}>
          {t1_short_name} <Text style={styles.versusText}>vs</Text>{' '}
          {t2_short_name}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            paddingLeft: 20,
            paddingTop: 30,
          }}>
          Pick Team 1
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 15,
        }}>
        <View
          style={{
            width: '25%',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
          }}>
          <Text style={styles.BottomText}>
            BAT(
            {numbersOfBatsman})
          </Text>
        </View>
        <View
          style={{
            width: '25%',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
          }}>
          <Text style={styles.BottomText}>
            WK(
            {numbersOfWC})
          </Text>
        </View>
        <View
          style={{
            width: '25%',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
          }}>
          <Text style={styles.BottomText}>
            AR(
            {numbersOfAll})
          </Text>
        </View>
        <View
          style={{
            // width: '25%',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
          }}>
          <Text style={styles.BottomText}>
            BOWL(
            {numbersOfBowlers})
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '95%',
          // borderWidth: 1,
          // height: '40%',
          marginTop: 30,
          overflow: 'hidden',
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: '100%',
            // borderWidth: 1,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
            }}>
            Pick 3-7 Batsman
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            padding: 5,
          }}>
          <Text
            style={{
              flexGrow: 1,
              fontSize: 14,
              fontWeight: '700',
            }}>
            Player
          </Text>
          <Text
            style={{
              marginRight: 10,
              fontSize: 14,
              fontWeight: '700',
            }}>
            Pts
          </Text>
          <Text
            style={{
              marginHorizontal: 10,
              fontSize: 14,
              fontWeight: '700',
            }}>
            Cr
          </Text>
        </View>
        <View
          style={{
            borderWidth: 1,
          }}>
          <FlatList
            data={playersArray}
            keyExtractor={item => item.id}
            style={{
              height: deviceHeight < 700 ? '50%' : '60%',
              // minHeight: '65%',
              // maxHeight: '70%',
            }}
            renderItem={itemData => {
              let isSelected = players.playerData.filter(
                item => item.id === itemData.item.id,
              ).length;
              return (
                <CustomButton
                  style={{
                    borderWidth: 1,
                  }}
                  onPress={() =>
                    isSelected
                      ? removePlayerHandler(itemData.item)
                      : playerHandler(itemData.item)
                  }>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      alignItems: 'center',
                      backgroundColor: isSelected ? 'pink' : 'white',
                    }}>
                    <Text style={styles.smallTitleText}>
                      {`${itemData.item.short_name} (${itemData.item.role}-${itemData.item.team_short_name})`}
                    </Text>
                    <Text
                      style={[
                        {
                          position: 'absolute',
                          right: 50,
                        },
                        styles.smallTitleText,
                      ]}>
                      {itemData.item.event_total_points}
                    </Text>
                    <Text
                      style={[
                        {
                          marginHorizontal: 10,
                          position: 'absolute',
                          right: 8,
                        },
                        styles.smallTitleText,
                      ]}>
                      {itemData.item.event_player_credit}
                    </Text>
                  </View>
                </CustomButton>
              );
            }}
          />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 30,
          width: '100%',
          backfaceVisibility: 'hidden',
        }}>
        <CustomButton
          style={{
            width: '100%',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            proceedHandler();
          }}>
          <Text style={{padding: 15, fontSize: 22, fontWeight: '700'}}>
            Proceed
          </Text>
        </CustomButton>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '25%',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
            }}>
            <Text style={styles.BottomText}>
              {totalNumberOfPlayers}/{TOTAL_PLAYERS}
            </Text>
            <Text style={styles.BottomText}>Players</Text>
          </View>
          <View
            style={{
              width: '25%',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
            }}>
            <Text style={styles.BottomText}>{teamOne}</Text>
            <Text style={styles.BottomText}>{t1_short_name}</Text>
          </View>
          <View
            style={{
              width: '25%',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
            }}>
            <Text style={styles.BottomText}>{teamTwo}</Text>
            <Text style={styles.BottomText}>{t2_short_name}</Text>
          </View>
          <View
            style={{
              width: '25%',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
            }}>
            <Text style={styles.BottomText}>{credits}</Text>
            <Text style={styles.BottomText}>Cr Left</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default observer(PickPlayerScreen);

const styles = StyleSheet.create({
  mainTitileContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 26,
    fontWeight: '700',
  },
  versusText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#8a8c89',
  },
  BottomText: {
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: 10,
  },
  smallTitleText: {fontSize: 11, fontWeight: '700'},
});
