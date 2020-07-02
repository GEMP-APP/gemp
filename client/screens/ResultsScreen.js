import React from 'react'
import { useSelector } from "react-redux"
import {StyleSheet, View, Text, Dimensions, ScrollView, TouchableOpacity} from 'react-native'
import { useFonts } from '@use-expo/font'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const userPlaceholder = [
    {
        id: 12321,
        name: "player 1111111",
        score: 999
    },
    {
        id: 12322,
        name: "player 22222",
        score: 13
    },
    {
        id: 12323,
        name: "player 3",
        score: 14
    },
    {
        id: 12324,
        name: "player 4",
        score: 15
    },
    {
        id: 12322,
        name: "player 2",
        score: 13
    },
    {
        id: 12326,
        name: "player 2",
        score: 13
    },
    {
        id: 12327,
        name: "ashiap",
        score: 10
    },

]

const Results = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'iHateComicSans': require('../assets/fonts/IHateComicSans.ttf')
    })

    const { winners } = useSelector(state => state.userReducer)

    const sortScore = (a, b) => {
        if(a.score < b.score) {
            return 1
        }
        if(a.score > b.score) {
            return -1
        }

        return 0
    }

    return (
        <View style={styles.globalContainer}>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Results</Text>
            </View>

            <View style={styles.leaderboard}>
                <ScrollView>
                    {winners.map( (user, i) => {
                        return (
                            <>
                                <Text style={styles.userNick} key={i}>{i+1}. {user.username}</Text>
                                <Text style={styles.userScore}>{user.score} Pts</Text>
                            </>
                        )
                    })}
                </ScrollView>
            </View>

            <View style={styles.returnButtonContainer}>
                    <TouchableOpacity style={styles.returnButton} onPress={ () => navigation.navigate('GetNick')}>
                        <Text style={styles.returnButtonLabel}>Back to Menu</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#608efe',
    },
    titleContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontFamily: 'iHateComicSans',
        fontSize: (windowWidth / 100) * 15
    },
    leaderboard: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center',
        width: (windowWidth / 100) * 80,
        padding: (windowWidth / 100) * 5,
        borderColor: 'white',
        borderWidth: (windowWidth / 100) * 1,
        borderRadius: 20
    },
    userNick: {
        color: 'white',
        fontFamily: 'iHateComicSans',
        fontSize: (windowWidth / 100) * 9,
        marginBottom: (windowWidth / 100) * 3
    },
    userScore: {
        color: '#fcdd03',
        fontFamily: 'iHateComicSans',
        fontSize: (windowWidth / 100) * 8,
        marginLeft: (windowWidth / 100) * 7,
        marginBottom: (windowWidth / 100) * 7
    },
    returnButtonContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    returnButton: {
        backgroundColor: '#fcdd03',
        width: (windowWidth / 100) * 60,
        height: (windowHeight / 100) * 15,
        borderRadius: (windowWidth / 100) * 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    returnButtonLabel: {
        fontFamily: 'iHateComicSans',
        fontSize: (windowWidth / 100) * 8
    }
})

export default Results