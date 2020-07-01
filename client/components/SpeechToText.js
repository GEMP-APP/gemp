import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import Voice from '@react-native-community/voice';
// import * as Permissions from 'expo-permissions';

function SpeechToText(props) {
  const {
    onSpeechResults,
    children,
    style,
  } = props;

  Voice.onSpeechResults = onSpeechResults;

  async function startRecognizing() {
    console.log('started');
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <TouchableHighlight
      style={style}
      onPress={startRecognizing}
    >
      {children}
    </TouchableHighlight>
  );
}

// const width = Dimensions.get('screen').width;

// const styles = StyleSheet.create({
//   text: {
//     borderColor: 'black',
//     borderWidth: 2,
//   },
//   button: {
//     backgroundColor: 'coral',
//     width: width/8,
//     height: width/8,
//     borderRadius: 10,
//   },
//   image: {
//     maxWidth: width/8,
//     maxHeight: width/8,
//   },
// });

export default SpeechToText;
