import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import CustomButton from '../components/CustomButton';

const SaveMyTeam = props => {
  const {route, navigation} = props;

  console.log(route, 'route');
  const {t1_short_name, t2_short_name, players} = route.params;
  console.log(players.playerData, 'punith');

  const modifiedArray = players.playerData.map(item => ({
    ...item,
    cc: false,
    vc: false,
  }));

  const saveHandler = () => {};
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
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '600',
            paddingLeft: 20,
            paddingTop: 30,
          }}>
          Pick Team 1
        </Text>
      </View>

      <View
        style={{
          width: '95%',
          height: 395,
          marginTop: 30,
        }}>
        <View
          style={{
            width: '100%',
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              textAlign: 'center',
            }}>
            Select Captian & Vice Captain
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
              // marginRight: 10,
              fontSize: 14,
              fontWeight: '700',
              marginRight: 10,
            }}>
            Pts
          </Text>
          <Text
            style={{
              marginRight: '24%',
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
            data={modifiedArray}
            keyExtractor={item => item.id}
            renderItem={itemData => {
              // let isSelected = players.playerData.filter(
              //   item => item.id === itemData.item.id,
              // ).length;
              return (
                <View
                  style={{
                    borderWidth: 1,
                  }}
                  // disabled={isSelected}
                  // onPress={() =>
                  // isSelected
                  //   ? removePlayerHandler(itemData.item)
                  //   : playerHandler(itemData.item)
                  // }
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      alignItems: 'center',
                      backgroundColor: 'white',
                      justifyContent: 'space-evenly',
                    }}>
                    <Text
                      style={[
                        styles.smallTitleText,
                        {
                          flexGrow: 1,
                        },
                      ]}>
                      {`${itemData.item.short_name} (${itemData.item.role}-${itemData.item.team_short_name})`}
                    </Text>
                    <Text
                      style={[
                        {
                          // position: 'absolute',
                          // right: 70,
                          marginHorizontal: 5,
                        },
                        styles.smallTitleText,
                      ]}>
                      {itemData.item.event_total_points}
                    </Text>

                    <Text
                      style={[
                        {
                          marginHorizontal: 5,
                          // position: 'absolute',
                          // right: 50,
                        },
                        styles.smallTitleText,
                      ]}>
                      {itemData.item.event_player_credit}
                    </Text>
                    <CustomButton>
                      <Text
                        style={{
                          padding: 5,
                          backgroundColor: '#eee',
                          marginHorizontal: 5,

                          // position: 'absolute',
                          // right: 30,
                        }}>
                        C
                      </Text>
                    </CustomButton>
                    <CustomButton>
                      <Text
                        style={{
                          padding: 5,
                          backgroundColor: '#eee',
                          marginHorizontal: 10,

                          // position: 'absolute',
                          // right: 8,
                        }}>
                        VC
                      </Text>
                    </CustomButton>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 60,
          width: '100%',
          // marginTop: 30,
        }}>
        <CustomButton
          style={{
            width: '100%',
            borderWidth: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            saveHandler();
          }}>
          <Text style={{padding: 15, fontSize: 22, fontWeight: '700'}}>
            Save Team
          </Text>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default SaveMyTeam;

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
