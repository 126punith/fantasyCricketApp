import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MyTeamScreen = props => {
  const {route} = props;
  console.log(props, 'props');
  const {t1_short_name, t2_short_name, event_name} = route.params;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>
        {t1_short_name} ,{t2_short_name} ,{event_name}{' '}
      </Text>
    </View>
  );
};

export default MyTeamScreen;

const styles = StyleSheet.create({});
