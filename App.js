import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import colorCode from './src/Utility/ColorCode';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainRoute from './src/navigation/navigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colorCode.primary}
        barStyle={'dark-content'}
      />
      <SafeAreaProvider>
        <NavigationContainer>
          <MainRoute />
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorCode.white,
  },
});
export default App;
