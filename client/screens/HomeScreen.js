import React, { useEffect } from 'react'
import { StyleSheet, Text, TextInput, View, Dimensions, PixelRatio} from 'react-native'
import { useFonts } from '@use-expo/font'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppLoading } from 'expo';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({navigation}) => {
    let [fontsLoaded] = useFonts({
        'iHateComicSans' : require('../assets/fonts/IHateComicSans.ttf')
    })
    
    if(!fontsLoaded) {
        return (
            <AppLoading />
        )
    }

    return (
        <View style={styles.globalContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText1}>G E M P</Text>
                <Text style={styles.titleText2}>"Guess My Painting"</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={ () => navigation.navigate('GetNick')} style={styles.startButton}>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        backgroundColor: "#608efe"
    },
    titleContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
        
    },
    titleText1: {
        fontSize: (windowWidth / 100) * 20,
        color: "white",
        fontFamily: 'iHateComicSans'
        
    },
    titleText2: {
        fontSize: (windowWidth / 100) * 8,
        color: "white",
        fontFamily: 'iHateComicSans'
    },
    buttonContainer: {
        flex: 1,
        alignItems: "center"
    },
    startButton: {
        justifyContent: "center",
        backgroundColor: "#fcdd03",
        borderRadius: 30,
        width: (windowWidth / 100) * 70,
        height: (windowHeight / 100) * 10
    },
    buttonText: {
        textAlign: "center",
        color: "gray",
        fontFamily: "iHateComicSans",
        fontSize: (windowWidth / 100) * 10,
    }

})

export default Home