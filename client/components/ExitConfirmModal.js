import React from 'react'
import {StyleSheet, View, Text, Dimensions, TouchableOpacity, BackHandler } from 'react-native'
import { useFonts } from '@use-expo/font'
import { AppLoading } from 'expo'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const ExitConfirm = ({closeModal}) => {

    const [fontsLoaded] = useFonts({
        'iHateComicSans': require('../assets/fonts/IHateComicSans.ttf')
    })


    if (!fontsLoaded) {
        return (
            <AppLoading />
        )
    }

    return (
        <View style={styles.globalContainer}>
            <View style={styles.modalContainer}>

                <View style={styles.messageContainer}>
                    <Text style={styles.message}>Are you sure want to exit?</Text>
                </View>

                <View style={styles.confirmButtonContainer}>
                    <TouchableOpacity style={styles.confirmButton} onPress={ () => BackHandler.exitApp()}>
                        <Text style={styles.confirmButtonLabel}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.confirmButton} onPress={ () => closeModal()}>
                        <Text style={styles.confirmButtonLabel}>No</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
     )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        width: (windowWidth / 100) * 90,
        height: (windowHeight / 100) * 50,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: (windowWidth / 100) * 80,
    },
    message: {
        color: '#608efe',
        fontSize: (windowWidth / 100) * 10,
        fontFamily: 'iHateComicSans',
        textAlign: 'center',
    },
    confirmButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: (windowWidth / 100) * 80
    },
    confirmButton: {
        backgroundColor: '#fcdd03',
        width: (windowWidth / 100) * 25,
        height: (windowHeight / 100) * 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmButtonLabel: {
        fontSize: (windowWidth / 100) * 7,
        fontFamily: 'iHateComicSans'
    }

})
export default ExitConfirm