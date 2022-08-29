import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SCREENS} from '../Utility/Constants';
import CustomButton from '../components/CustomButton';
import PlayersStore from '../store/PlayersStore';
import {observer} from 'mobx-react-lite';

const MyTeamScreen = props => {
  const {route, navigation} = props;
  console.log(props, 'props');
  const {t1_short_name, t2_short_name, event_name} = route.params;
  const {MyTeams} = PlayersStore;

  const myMainPlayer = [];
  MyTeams.map((item, index) => {
    console.log(item, 'Punith');
    let {capitan, viceCapitan} = item;
    myMainPlayer.push({
      capitan,
      viceCapitan,
    });
  });

  console.log(MyTeams, 'MyTeams Data');
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <View style={styles.mainTitileContainer}>
        <Text style={styles.titleText}>
          {t1_short_name} <Text style={styles.versusText}>vs</Text>{' '}
          {t2_short_name}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          left: 20,
          top: '10%',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
          }}>
          My Teams
        </Text>
      </View>
      {myMainPlayer
        ? myMainPlayer.map((item, index) => {
            console.log(item, 'Punith');

            let {capitan, viceCapitan} = item;

            return (
              <View
                style={{
                  width: '80%',
                  height: 150,
                  borderWidth: 2,
                  marginTop: 50,
                }}>
                <Text
                  style={{
                    marginTop: 10,
                    marginLeft: 10,
                    marginBottom: 10,
                    fontSize: 18,
                    fontWeight: '700',
                  }}>
                  Team {index + 1}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginLeft: 10,
                    marginBottom: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    {capitan.short_name}
                  </Text>
                  <Text
                    style={{
                      padding: 2,
                      backgroundColor: '#a8a7a5',
                      marginLeft: 10,
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    C
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    {viceCapitan.short_name}
                  </Text>
                  <Text
                    style={{
                      padding: 2,
                      backgroundColor: '#a8a7a5',
                      marginLeft: 10,
                      fontSize: 14,
                      fontWeight: '700',
                    }}>
                    VC
                  </Text>
                </View>
              </View>
            );
          })
        : null}

      <CustomButton
        style={{
          width: '70%',
          borderWidth: 2,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 30,
          margin: 20,
          position: 'absolute',
          bottom: 60,
        }}
        onPress={() => {
          navigation.navigate(SCREENS.PICK_PLAYERS, {
            t1_short_name,
            t2_short_name,
            event_name,
          });
        }}>
        <Text style={{padding: 15, fontSize: 22, fontWeight: '700'}}>
          + Add New Team
        </Text>
      </CustomButton>
    </SafeAreaView>
  );
};

export default observer(MyTeamScreen);

const styles = StyleSheet.create({
  mainTitileContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 26,
    fontWeight: '600',
  },
  versusText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#8a8c89',
  },
});
