import React from 'react'
import {StyleSheet ,TouchableOpacity, Dimensions, Text} from 'react-native'

const windowWidth = Dimensions.get('window').width;

const Room = ({id, title}) => {

    return (
        <TouchableOpacity style={styles.room}>
            <Text style={{flex: 1, color: 'white'}}>{id ? id : "no id"}</Text>
            <Text style={{flex: 1, color: 'white'}}>title: {title ? title : "no title"}</Text>
            <Text style={{flex: 1, color: 'white'}}>0 / 4</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    room: {
        margin: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: (windowWidth / 100) * 30,
        height: (windowWidth / 100) * 30,
        borderBottomColor: '#fcdd03',
        borderStyle: 'solid',
        borderBottomWidth: 3,
        padding: 3
    }
})

export default Room