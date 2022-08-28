import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SCREENS} from '../Utility/Constants';

const MyTeamScreen = props => {
  const {route, navigation} = props;
  console.log(props, 'props');
  const {t1_short_name, t2_short_name, event_name} = route.params;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={styles.mainTitileContainer}>
        <Text style={styles.titleText}>
          {t1_short_name} <Text style={styles.versusText}>vs</Text>{' '}
          {t2_short_name}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          width: '70%',
          borderWidth: 2,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          bottom: 30,
          margin: 20,
        }}
        activeOpacity={0.5}
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
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default MyTeamScreen;

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
