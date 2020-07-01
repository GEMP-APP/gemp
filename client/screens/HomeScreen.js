import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  BackHandler,
  Modal,
} from "react-native";
import { useDispatch } from "react-redux";
import { connectToSocket } from "../store/actions/socketActions";
import { useFonts } from "@use-expo/font";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppLoading } from "expo";

import ExitConfirmModal from "../components/ExitConfirmModal";
import LoadingModal from "../components/LoadingModal";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Home = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    iHateComicSans: require("../assets/fonts/IHateComicSans.ttf"),
  });

  const [toggleModal, setToggleModal] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const dispatch = useDispatch();
  const [startButtonText, setStartButtonText] = useState("Start");
  const startButtonHandle = () => {
    dispatch(connectToSocket());
    setToggleLoading(true)
    setTimeout(() => {
      navigation.navigate("GetNick");
      setToggleLoading(false)
    }, 2000);
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", openModal);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", openModal);
  }, []);

  const openModal = () => {
    // console.log('im being called!')
    setToggleModal(true);
    return true;
  };

  const closeModal = () => {
    setToggleModal(false);
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.globalContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText1}>G E M P</Text>
        <Text style={styles.titleText2}>"Guess My Painting"</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={startButtonHandle}
          style={styles.startButton}
        >
          <Text style={styles.buttonText}>{startButtonText}</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="fade" transparent={true} visible={toggleModal}>
        <ExitConfirmModal closeModal={closeModal} />
      </Modal>
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
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText1: {
    fontSize: (windowWidth / 100) * 20,
    color: "white",
    fontFamily: "iHateComicSans",
  },
  titleText2: {
    fontSize: (windowWidth / 100) * 8,
    color: "white",
    fontFamily: "iHateComicSans",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  startButton: {
    justifyContent: "center",
    backgroundColor: "#fcdd03",
    borderRadius: 30,
    width: (windowWidth / 100) * 70,
    height: (windowHeight / 100) * 10,
  },
  buttonText: {
    textAlign: "center",
    color: "gray",
    fontFamily: "iHateComicSans",
    fontSize: (windowWidth / 100) * 10,
  },
});

export default Home;
