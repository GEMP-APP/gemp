import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {Provider} from 'react-redux'
import store from './store'

import DefaultScreen from './screens/ScreenTemplate'
import HomeScreen from './screens/HomeScreen'
import GetNickScreen from './screens/GetNickScreen'
import SearchRoomScreen from './screens/SearchRoomScreen'

const Stack = createStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false, animationEnabled: false}}>
          {/* <Stack.Screen name="Test" component={DefaultScreen} /> */}
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="GetNick" component={GetNickScreen} />
          <Stack.Screen name="SearchRoom" component={SearchRoomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
