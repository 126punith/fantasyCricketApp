import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {SCREENS} from '../Utility/Constants';
import MatchesScreen from '../Screens/MatchesScreen';
import MyTeamScreen from '../Screens/MyTeamScreen';
import PickPlayerScreen from '../Screens/PickPlayerScreen';

const Stack = createStackNavigator();
const MainRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      defaultScreenOptions={SCREENS.MATCHES}>
      <Stack.Screen name={SCREENS.MATCHES} component={MatchesScreen} />
      <Stack.Screen name={SCREENS.MY_TEAM} component={MyTeamScreen} />
      <Stack.Screen name={SCREENS.PICK_PLAYERS} component={PickPlayerScreen} />
    </Stack.Navigator>
  );
};

export default MainRoute;
