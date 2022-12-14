import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colorCode from '../Utility/ColorCode';

const MatchsBoard = props => {
  const {
    navigation,
    t1_image,
    event_name,
    t2_short_name,
    t1_short_name,
    t2_image,
  } = props;

  return (
    <TouchableOpacity
      style={styles.matchsContainer}
      activeOpacity={0.5}
      onPress={() => {
        console.log(
          navigation.navigate('MyTeam', {
            t1_short_name,
            t2_short_name,
            event_name,
          }),
        );
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
          {t1_short_name} <Text style={styles.subText}>vs</Text> {t2_short_name}
        </Text>
      </View>
      <Image
        source={{
          uri: t2_image,
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

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

export default MatchsBoard;
