import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Colors from '../constants/Colors';
import { Fontisto, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default (props) => {

  const renderOptions = () => {
    const allColors = Object.keys(Colors);

    return allColors.map(color => (
      <TouchableOpacity
        key={color}
        style={[styles.option, { backgroundColor: Colors[color] }]}
        onPress={() => props.onPress(Colors[color])}
      />
    ));
  }

  return (
    <View style={styles.container}>
      {renderOptions()}
      <TouchableOpacity style={[styles.option, { borderRadius: 0 }]} onPress={() => props.onPress(Colors.color1)}>
        <FontAwesome name="paint-brush" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.option, { borderRadius: 0 }]} onPress={() => props.onPress('eraser')}>
        <Fontisto name="eraser" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.option, { borderRadius: 0 }]} onPress={() => props.onPress('clear')}>
        <MaterialIcons name="clear" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}

let styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#DDD',
    paddingVertical: 5,
    paddingHorizontal: 10
  },

  option: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10
  }
});