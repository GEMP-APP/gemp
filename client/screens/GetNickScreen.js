import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { useFonts } from '@use-expo/font'
import { AppLoading } from 'expo'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { changeUserNick }from '../store/actions/userActions'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GetNick = ({navigation}) => {
    const dispatch = useDispatch()
    let [fontsLoaded] = useFonts({
        'iHateComicSans': require('../assets/fonts/IHateComicSans.ttf')
    })

    const [inputNick, setInputNick] = useState("")

    const updateNick = (text) => {
        setInputNick(text)
        console.log(inputNick)
    }
    const submitAndSearch = () => {
        if(!inputNick){
            alert('please input nickname')
        } else {
            console.log('submitting nickname:', inputNick)
            dispatch(changeUserNick(inputNick))
            navigation.navigate('SearchRoom')
        }
    }
    const submitAndCreate = () => {
        if(!inputNick){
            alert('please input nickname')
        } else {
            console.log('submitting nickname:', inputNick)
            dispatch(changeUserNick(inputNick))
            navigation.navigate('CreateRoom')
        }
    }

    if(!fontsLoaded){
        <AppLoading />
    }

    return (
        <View style={styles.globalContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.InputLabel}>Input Nickname</Text>
                <TextInput 
                    value={inputNick}
                    onChangeText={(text) =>  updateNick(text)}
                    style={styles.inputBox} 
                    maxLength={12}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={() => submitAndSearch()}>
                    <Text style={styles.buttonText}>Search Room</Text>
                </TouchableOpacity>
                <Text style={styles.dividerText}>OR</Text>
                <TouchableOpacity style={styles.submitButton} onPress={() => submitAndCreate()}>
                    <Text style={styles.buttonText}>Create Room</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 0.7}}>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        backgroundColor: "#608efe",
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    InputLabel: {
        color: 'white',
        fontFamily: 'iHateComicSans',
        fontSize: 38
    },
    inputBox: {
        fontFamily: 'iHateComicSans',
        fontSize: 24,
        marginTop: 15,
        backgroundColor: "white",
        textAlign: 'center',
        borderRadius: 30,
        width: 250,
        height: 40
    },
    buttonContainer: {
        flexDirection: "row",
        flex: 0.3,
        justifyContent: "center"
    },
    submitButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#fcdd03',
        width: 200,
        height: 70,
        borderRadius: 30
    },
    buttonText: {
        fontFamily: 'iHateComicSans',
        fontSize: 28,
        color: "gray"
    },
    dividerText: {
        color: "white",
        fontFamily: 'iHateComicSans',
        fontSize: 24,
        margin: 20
    }
})

export default GetNick