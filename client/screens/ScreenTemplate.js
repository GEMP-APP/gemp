import React, { useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Dimensions} from 'react-native'
import { useSelector, useDispatch} from 'react-redux'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TempScreen = () => {

    const tempVar = useSelector(state => state.defaultReducer.tempVar)

    useEffect( () => {
        console.log(tempVar)
    }, [tempVar])

    return (
        <View style={styles.globalWrapper}>
            <View style={styles.container1}>
                <Text>Ini Screen Template</Text>
            </View>
            <View style={styles.container2}>
                <Text>cuma buat referensi {tempVar}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    globalWrapper: {
        flex:1
    },
    container1: {
        flex: 1,
        backgroundColor: '#fe9901',
    },
    container2: {
        flex: 1,
        backgroundColor: '#5375fd',
    }
})

export default TempScreen