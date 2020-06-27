import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {useSelector} from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'

const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
];

const SearchRoom = () => {
    const userNick = useSelector(state => state.userReducer.userNick)


    return (
        <View style={styles.globalContainer}>
            <View style={styles.WelcomeTextContainer}>
                <Text>Welcome, {userNick}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default SearchRoom