import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, FlatList, TextInput, RefreshControl, Modal } from 'react-native'
import {useSelector} from 'react-redux'
import {useFonts} from '@use-expo/font'
import { AppLoading } from 'expo';

import ShowAnswerModal from '../components/ShowAnswerModal'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const userPlaceholder = [
    {
        id: 12321,
        name: "player 1111111",
        score: 12
    },
    {
        id: 12322,
        name: "player 2",
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

]

const chatPlaceholder = [
    {id: 1, chat: 'player 1111111: chicken'},
    {id: 2, chat: 'player 2: dinosaur',},
    {id: 3, chat: 'player 3: pidgey'},
    {id: 4, chat: 'player 1111111: chicken'},
    {id: 5, chat: 'player 2: dinosaur'},
    {id: 6, chat: 'player 3: pidgey'},
    {id: 7, chat: 'player 1111111: buwong puyoh'}
]

const randomWord = [
    'i wonder what does that mean..',
    'it looks like a..',
    'that thing looks strange..',
    'can you guess it?',
    'feeling smart?',
    'mind reading the painter..',
    'bingo!',
    'what the..',
    'the painter had one job..',
]

const Gameplay = () => {
    const [drawingMode, setDrawingMode] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const [currentAnswer, setCurrentAnswer] = useState('')
    const userNick = useSelector(state => state.userReducer.userNick)
    const { roomUsers, roomId } = useSelector(
        (state) => state.roomReducer
      );
    const [fontsLoaded] = useFonts({
          'iHateComicSans': require('../assets/fonts/IHateComicSans.ttf')
    })

    const getRandomWord = () => {
        let random = randomWord[Math.floor(Math.random() * randomWord.length)]
        return random
    }

    const submitChat = (text) => {
        const currentId = chatPlaceholder[(chatPlaceholder.length - 1)].id
        const chat = `${userNick}: ${text}`
        chatPlaceholder.push({id: (currentId + 1), chat: chat})

        console.log(chatPlaceholder)
    }

    const closeShowAnswer = () => {
        setShowAnswer(false)
    }

    if (!fontsLoaded) {
        return (
            <AppLoading />
        )
    }


    return (
        <View style={styles.globalContainer}>
            <ScrollView contentContainerStyle={{justifyContent: 'center' ,flexGrow: 1}} horizontal style={styles. userListContainer}>
                {roomUsers.map((user) => {
                    return (
                        <View key={user.id} style={styles.userBox}>
                            <Text style={styles.userDetail} >{user.username}</Text>
                            <Text style={styles.userDetail} >{user.score} pts</Text>
                        </View>
                    )
                })}
            </ScrollView>
            <View style={styles.canvasContainer}>
                <Text style={styles.guessWord}>GuessWord</Text>
                {/*   Tempat Canvas untuk yang painter    */}

            </View>
            {!drawingMode &&
            <>
                    <View style={styles.controlContainer}>
                        <TouchableOpacity style={styles.speakButton} onPress={ () => console.log('voice button being pressed')}>
                            <Text style={styles.speakLabel} >Hold to</Text>
                            <Text style={styles.speakLabel} >Voice</Text>
                            <Text style={styles.speakLabel} >Answer</Text>
                        </TouchableOpacity>
                        <View style={styles.answerContainer}>
                            <FlatList
                                style={styles.chatContainer}
                                data={chatPlaceholder}
                                renderItem={({item}) => (
                                    <Text>{item.chat}</Text>
                                )}
                                keyExtractor={item => String(item.id)}
                            />
                            <TextInput
                                contentContainerStyle={{justifyContent: 'end' ,flexGrow: 1}}
                                style={styles.answerInput}
                                placeholder="Answer Here"
                                onSubmitEditing={(event) => {submitChat(event.nativeEvent.text)}}
                            />
                        </View>
                    </View>
                </>
            }
            <Modal
                animationType='fade'
                transparent={true}
                visible={showAnswer}
            >
                <ShowAnswerModal answer={currentAnswer} closeShowAnswer={closeShowAnswer}/>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: "#608efe",
  },
  userListContainer: {
    flex: 1,
  },
  userBox: {
    alignItems: "center",
    backgroundColor: "#fcdd03",
    marginTop: "auto",
    marginLeft: (windowWidth / 100) * 1,
    marginRight: (windowWidth / 100) * 1,
    marginBottom: "auto",
    padding: (windowWidth / 100) * 1.5,
    borderRadius: 10,
  },
  userDetail: {
    fontFamily: "iHateComicSans",
    fontSize: (windowWidth / 100) * 4,
  },
  canvasContainer: {
    flex: 7,
    alignItems: "center",
    backgroundColor: "white",
    margin: (windowWidth / 100) * 2,
    borderTopLeftRadius: (windowWidth / 100) * 5,
    borderTopRightRadius: (windowWidth / 100) * 5,
    borderBottomLeftRadius: (windowWidth / 100) * 5,
    borderBottomRightRadius: (windowWidth / 100) * 5,
  },
  guessWord: {
    fontSize: (windowWidth / 100) * 5,
  },
  controlContainer: {
    flex: 2,
    flexDirection: "row",
  },
  speakButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcdd03",
    margin: (windowWidth / 100) * 1,
    borderRadius: 20,
  },
  speakLabel: {
    fontSize: (windowWidth / 100) * 5,
  },
  answerContainer: {
    flex: 3,
    backgroundColor: "white",
    margin: (windowWidth / 100) * 1,
    borderRadius: 10,
  },
  chatContainer: {
    margin: (windowWidth / 100) * 1,
  },
  answerInput: {
    color: "black",
    height: (windowWidth / 100) * 10,
    marginTop: (windowWidth / 100) * 0.5,
    marginLeft: (windowWidth / 100) * 2,
    marginRight: (windowWidth / 100) * 2,
    borderBottomColor: "#fcdd03",
    borderBottomWidth: (windowWidth / 100) * 1,
  },
});

export default Gameplay;