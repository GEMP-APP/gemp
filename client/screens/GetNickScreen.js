import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { useFonts } from "@use-expo/font";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, StyleSheet, Dimensions, Modal } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { changeUserNick } from "../store/actions/userActions";
import { appStart } from "../store/actions/roomActions";
import LoadingModal from "../components/LoadingModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const GetNick = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    iHateComicSans: require("../assets/fonts/IHateComicSans.ttf"),
  });
  const dispatch = useDispatch();
  const [toggleModal, setToggleModal] = useState(false);
  const [inputNick, setInputNick] = useState("");
  const { socket } = useSelector((state) => state.socketReducer);
  const { username } = useSelector((state) => state.userReducer);
  const [searchRoomText, setSearchRoomText] = useState("Search Room");
  const [inputUsernameTapped, setInputUsernameTapped] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);

  const submitAndSearch = () => {
    if (!inputNick) {
      alert("please input nickname");
    } else {
      // dispatch(appStart());
      socket && socket.emit("getRooms");
      dispatch(changeUserNick(inputNick));
      setToggleLoading(true);
      setTimeout(() => {
        navigation.navigate("SearchRoom");
        setToggleLoading(false);
      }, 3000);
    }
  };

  const submitAndCreate = () => {
    if (!inputNick) {
      alert("please input nickname");
    } else {
      dispatch(changeUserNick(inputNick));
      navigation.navigate("CreateRoom");
    }
    // navigation.navigate("Gameplay");
  };

  const inputUsernameHandle = () => {
    if (!inputUsernameTapped) {
      setInputNick(username);
    }
  };

  if (!fontsLoaded) {
    <AppLoading />;
  }

  return (
    <View style={styles.globalContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.InputLabel}>Input Nickname</Text>
        <TextInput
          placeholder={username}
          value={inputNick}
          onChangeText={(text) => setInputNick(text)}
          style={styles.inputBox}
          maxLength={12}
          onPress={inputUsernameHandle}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={submitAndSearch}>
          <Text style={styles.buttonText}>{searchRoomText}</Text>
        </TouchableOpacity>

        <Text style={styles.dividerText}>OR</Text>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => submitAndCreate()}
        >
          <Text style={styles.buttonText}>Create Room</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.7 }}></View>
      <Modal animationType="fade" transparent={true} visible={toggleLoading}>
        <LoadingModal />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: "#608efe",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  InputLabel: {
    color: "white",
    fontFamily: "iHateComicSans",
    fontSize: (windowWidth / 100) * 10,
  },
  inputBox: {
    fontFamily: "iHateComicSans",
    fontSize: (windowWidth / 100) * 6,
    marginTop: (windowWidth / 100) * 8,
    backgroundColor: "white",
    textAlign: "center",
    borderRadius: 30,
    width: (windowWidth / 100) * 70,
    height: (windowHeight / 100) * 8,
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fcdd03",
    width: (windowWidth / 100) * 60,
    height: (windowHeight / 100) * 15,
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: "iHateComicSans",
    fontSize: (windowWidth / 100) * 7,
    color: "gray",
  },
  dividerText: {
    color: "white",
    fontFamily: "iHateComicSans",
    fontSize: (windowWidth / 100) * 5,
    margin: (windowWidth / 100) * 5,
  },
});

export default GetNick;
