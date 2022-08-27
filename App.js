import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import colorCode from './src/Utility/ColorCode';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainRoute from './src/navigation/navigation';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    // <GestureHandlerRootView style={{flex: 1}}>
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colorCode.primary}
        barStyle={'light-content'}
      />
      <SafeAreaProvider>
        <NavigationContainer>
          <MainRoute />
        </NavigationContainer>
      </SafeAreaProvider>
    </View>
    // </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorCode.white,
  },
});
export default App;
