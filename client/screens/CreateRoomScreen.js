import React, { useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Dimensions, TextInput, Modal} from 'react-native'
import {useFonts} from '@use-expo/font'
import Axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CreateRoom = ({navigation: {navigate}}) => {
    const [roomName, setRoomName] = useState('My Room')
    const [maxPlayer, setMaxPlayer] = useState(2)
    const [maxScore, setMaxScore] = useState(100)
    const [category, setCategory] = useState('animals')
    const [toggleModal, setToggleModal] = useState('animals')
    const [fontsLoaded] = useFonts({
        'iHateComicSans': require('../assets/fonts/IHateComicSans.ttf')
    })

    const createRoom = () => {
        Axios({
            method: 'POST',
            url: 'http://54.169.11.236:4000/rooms',
            data: {
                name: roomName,
                category,
                poster_path: 'https://via.placeholder.com/50',
                language: "en",
                capacity: maxPlayer,
                maxScore,
                currentScore: 30,    
            }
        })
            .then((res) => {
                console.log(res.data);
                alert(JSON.stringify(res.data));
            })
            .catch((err) => console.log(err));
    }

    return (
        <View style={styles.globalContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Create Room</Text>

            </View>
            <View style={styles.settingContainer}>

                <Text style={styles.inputNameLabel} >Room Name :</Text>
                <TextInput
                    value={roomName}
                    onChangeText={ (text) => setRoomName(text)}
                    style={styles.inputName}
                    maxLength={15}
                />

                <Text style={styles.maxPlayerLabel}>Max player : <Text style={styles.valueLabel}>{maxPlayer}</Text></Text>
                <View style={styles.maxPlayerButtonsContainer}>

                    <TouchableOpacity style={styles.maxPlayerButton} onPress={ () => setMaxPlayer(2)}>
                        <Text style={styles.maxPlayerButtonLabel}>2</Text >
                    </TouchableOpacity >

                    <TouchableOpacity style={styles.maxPlayerButton}  onPress={ () => setMaxPlayer(4)}>
                        <Text style={styles.maxPlayerButtonLabel}>4</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.maxPlayerButton}  onPress={ () => setMaxPlayer(6)}>
                        <Text style={styles.maxPlayerButtonLabel}>6</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.maxPlayerButton}  onPress={ () => setMaxPlayer(8)}>
                        <Text style={styles.maxPlayerButtonLabel}>8</Text>
                    </TouchableOpacity>

                </View>

                <Text style={styles.categoryLabel}>Category : <Text style={styles.valueLabel}>{category}</Text></Text>
                <TouchableOpacity style={styles.modalButton} onPress={ () => setToggleModal(true)}>
                    <Text style={styles.modalButtonLabel}>Choose Category</Text>
                </TouchableOpacity>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={toggleModal}
                >
                    <View style={styles.transparentBG}>
                        <View style={styles.modalContainer}>
                            <View style={styles.categoryButtonsContainer}>

                                <TouchableOpacity style={styles.categoryButton} onPress={ () => {setCategory('animals'), setToggleModal(false)}}>
                                    <Text style={styles.categoryButtonLabel}>animals</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.categoryButton}  onPress={ () => {setCategory('tools'), setToggleModal(false)}}>
                                    <Text style={styles.categoryButtonLabel}>tools</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.categoryButton}  onPress={ () => {setCategory('occupations'), setToggleModal(false)}}>
                                    <Text style={styles.categoryButtonLabel}>occupations</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.categoryButton}  onPress={ () => {setCategory('vehicles'), setToggleModal(false)}}>
                                    <Text style={styles.categoryButtonLabel}>vehicles</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={styles.cancelModalButtonContainer}>
                                <TouchableOpacity onPress={ () => setToggleModal(false)} style={styles.cancelModalButton}>
                                    <Text style={styles.cancelModalButtonLabel}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </Modal>

                <Text style={styles.maxScoreLabel}>Max Score :</Text>
                <TextInput
                    style={styles.maxScoreInput}
                    value={String(maxScore)}
                    keyboardType='number-pad'
                    maxLength={3}
                    // defaultValue={String(100)}
                    clearTextOnFocus={true}
                    onChangeText={ (text) => setMaxScore(Number(text))}
                />

            </View>
            <View style={styles.submitContainer}>
                <TouchableOpacity style={styles.submitButton} onPress={createRoom}>
                    <Text style={styles.submitButtonText}>Create</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    globalContainer: {
        flex: 1,
        backgroundColor: '#608efe',
    },
    titleContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: 'white',
        fontFamily: 'iHateComicSans',
        fontSize: (windowWidth / 100) * 15
    },
    settingContainer: {
        flex: 6,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    inputNameLabel:{
        color: 'white',
        fontFamily: 'iHateComicSans',
        fontSize: (windowWidth / 100) * 7
    },
    inputName: {
        textAlign: 'center',
        color: 'white',
        fontSize: (windowWidth / 100) * 5,
        width: (windowWidth / 100) * 50,
        height: (windowHeight / 100) * 6,
        borderBottomWidth: (windowWidth / 100) * 1,
        borderBottomColor: '#fcdd03',
        marginBottom: (windowWidth / 100) * 6
    },
    maxPlayerLabel: {
        color: 'white',
        fontSize: (windowWidth / 100) * 7,
        fontFamily: 'iHateComicSans',
    },
    valueLabel: {
        color: '#fcdd03'
    },
    maxPlayerButtonsContainer: {
        flexDirection: 'row',
        marginBottom: (windowWidth / 100) * 6
    },
    maxPlayerButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcdd03',
        width: (windowWidth / 100) * 15,
        height: (windowHeight / 100) * 7,
        margin: (windowWidth / 100) * 2,
        borderRadius: 15
    },
    maxPlayerButtonLabel: {
        fontSize: (windowWidth / 100) * 5,
        fontFamily: 'iHateComicSans'
    },
    categoryLabel:{
        color: 'white',
        fontFamily: 'iHateComicSans',
        fontSize: (windowWidth / 100) * 7
    },
    modalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcdd03',
        width: (windowWidth / 100) * 60,
        height: (windowHeight / 100) * 6,
        borderRadius: 15,
        marginBottom: (windowWidth / 100) * 6
    },
    modalButtonLabel: {
        fontFamily: 'iHateComicSans',
        fontSize: (windowWidth / 100) * 5
    },
    transparentBG: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        backgroundColor: 'white',
        width: (windowWidth / 100) * 80,
        height: (windowHeight / 100) * 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    categoryButtonsContainer: {
        flex: 2,
        justifyContent: 'space-evenly'
    },
    categoryButton: {
        width: (windowWidth / 100) * 60,
        height: (windowHeight/ 100) * 7,
        backgroundColor: '#fcdd03',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    categoryButtonLabel: {
        fontSize: (windowWidth / 100) * 5,
    },
    cancelModalButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelModalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcdd03',
        width: (windowWidth / 100) * 30,
        height: (windowHeight / 100) * 10,
        borderRadius: 20
    },
    cancelModalButtonLabel: {
        fontSize: (windowWidth / 100) * 5
    },
    maxScoreLabel: {
        color: 'white',
        fontFamily: 'iHateComicSans',
        fontSize: (windowWidth / 100) * 7,
        marginBottom: (windowWidth / 100) * 3
    },
    maxScoreInput: {
        color: 'white',
        fontSize: (windowWidth / 100) * 5,
        textAlign: 'center',
        width: (windowWidth / 100) * 20,
        height: (windowHeight / 100) * 5,
        borderBottomColor: '#fcdd03',
        borderBottomWidth: (windowWidth / 100) * 1
    },
    submitContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitButton: {        
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fcdd03',
        width: (windowWidth / 100) * 60,
        height: (windowHeight / 100) * 15,
        borderRadius: 20
    },
    submitButtonText: {
        fontFamily: 'iHateComicSans',
        fontSize: (windowWidth / 100) * 10
    }
})

export default CreateRoom