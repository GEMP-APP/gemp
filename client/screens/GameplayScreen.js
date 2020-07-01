import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
  Modal,
} from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";
import { useSelector, useDispatch } from "react-redux";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import {
  gameStart,
  setWord,
  checkAnswer,
} from "../store/actions/socketActions";
import CanvasComponent from "../components/CanvasComponent";
import ShowAnswerModal from "../components/ShowAnswerModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Gameplay = () => {
  const [fontsLoaded] = useFonts({
    iHateComicSans: require("../assets/fonts/IHateComicSans.ttf"),
  });

  const dispatch = useDispatch();
  const [inputAnswer, setInputAnswer] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [closeShowAnswer, setCloseShowAnswer] = useState(false);
  const {
    userNick,
    userId,
    username,
    roomMaster,
    drawingMode,
    waitingMode,
    isPlaying,
    words,
  } = useSelector((state) => state.userReducer);
  const { chatMessages } = useSelector((state) => state.chatReducer);
  const { roomUsers, roomId } = useSelector((state) => state.roomReducer);

  const voiceAnswerHandle = () => {
    // Convert voice to text here
    console.log("Speak to send answer");
  };

  const playButtonHandle = () => {
    // Start Play From Here
    dispatch(gameStart());
  };

  const submitChat = (text) => {
    // const currentId = chatPlaceholder[chatPlaceholder.length - 1].id;
    // const chat = `${userNick}: ${text}`;
    // chatPlaceholder.push({ id: currentId + 1, chat: chat });
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.globalContainer}>
      <ScrollView
        contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}
        horizontal
        style={styles.userListContainer}
      >
        {roomUsers.map((user) => {
          return (
            <View key={user.id} style={styles.userBox}>
              <Text style={styles.userDetail}>{user.username}</Text>
              <Text style={styles.userDetail}>{user.score} pts</Text>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.canvasContainer}>
        <Text style={styles.guessWord}>
          {drawingMode ? "Your Draw Turn" : "Your Guess Turn"}
        </Text>
        {/*   Tempat Canvas untuk yang painter    */}

        {!waitingMode && <CanvasComponent drawingMode={drawingMode} />}

        {/*   Tempat Canvas untuk yang painter    */}
        {drawingMode && waitingMode && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: 200,
              alignItems: "stretch",
              alignContent: "stretch",
              padding: 32,
            }}
          >
            <TouchableOpacity
              style={{
                marginRight: 16,
                padding: 8,
                backgroundColor: "yellow",
                borderRadius: 8,
                
              }}
              onPress={() => setWord(words[0])}
            >
              <Text style={styles.speakLabelB}>Word 1</Text>
              <Text style={styles.speakLabelB}>{words[0]}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginLeft: 16,
                padding: 8,
                backgroundColor: "yellow",
                borderRadius: 8,
              }}
              onPress={() => setWord(words[1])}
            >
              <Text style={styles.speakLabelB}>Word 2</Text>
              <Text style={styles.speakLabelB}>{words[1]}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {!drawingMode && (
        <>
          <View style={styles.controlContainer}>
            {isPlaying && !drawingMode && !waitingMode && (
              <TouchableOpacity
                style={styles.speakButton}
                onPress={() => voiceAnswerHandle()}
              >
                <Text style={styles.speakLabel}>Hold to</Text>
                <Text style={styles.speakLabel}>Voice</Text>
                <Text style={styles.speakLabel}>Answer</Text>
              </TouchableOpacity>
            )}

            {!isPlaying && roomMaster && (
              <TouchableOpacity
                style={styles.speakButton}
                onPress={() => playButtonHandle()}
              >
                <Text style={styles.speakLabel}>Press to</Text>
                <Text style={styles.speakLabel}>Start</Text>
                <Text style={styles.speakLabel}>Playing</Text>
              </TouchableOpacity>
            )}

            <View style={styles.answerContainer}>
              <FlatList
                style={styles.chatContainer}
                data={chatMessages}
                renderItem={({ item, index }) =>
                  item.username === "Gemp Bot" ? (
                    <Text key={index}>{item.message}</Text>
                  ) : (
                    <Text key={index}>
                      {item.username} {item.message}
                    </Text>
                  )
                }
              />
              <TextInput
                value={inputAnswer}
                autoCapitalize="none"
                onChangeText={(text) => setInputAnswer(text)}
                contentContainerStyle={{ justifyContent: "end", flexGrow: 1 }}
                style={styles.answerInput}
                placeholder="Answer Here"
                onSubmitEditing={(event) => {
                  checkAnswer(inputAnswer);
                  setInputAnswer("");
                }}
              />
            </View>
          </View>
        </>
      )}
      <Modal animationType="fade" transparent={true} visible={showAnswer}>
        <ShowAnswerModal
          answer={currentAnswer}
          closeShowAnswer={closeShowAnswer}
        />
      </Modal>
    </View>
  );
};

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
