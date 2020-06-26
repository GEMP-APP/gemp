import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import {Provider} from 'react-redux'
import store from './store'
import DefaultScreen from './screens/ScreenTemplate'

export default function App() {
  return (
    <Provider store={store}>
        <DefaultScreen>

        </DefaultScreen>
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
