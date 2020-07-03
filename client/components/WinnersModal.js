import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "@use-expo/font";
import { Easing } from "react-native-reanimated";
import { AppLoading } from "expo";
import { GAME_REMATCH } from "../store/actions/actionsType";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const WinnersModal = (navigation) => {
  let [fontsLoaded] = useFonts({
    iHateComicSans: require("../assets/fonts/IHateComicSans.ttf"),
  });

  const dispatch = useDispatch();

  const { winners } = useSelector((state) => state.userReducer);

  const userPlaceholder = [
    {
      id: 12321,
      name: "player 1111111",
      score: 999,
    },
    {
      id: 12322,
      name: "player 22222",
      score: 13,
    },
    {
      id: 12323,
      name: "player 3",
      score: 14,
    },
    {
      id: 12324,
      name: "player 4",
      score: 15,
    },
    {
      id: 12322,
      name: "player 2",
      score: 13,
    },
    {
      id: 12326,
      name: "player 2",
      score: 13,
    },
    {
      id: 12327,
      name: "ashiap",
      score: 10,
    },
  ];

  console.log("WINEERRRSSS", winners);

  if (!fontsLoaded) {
    <AppLoading />;
  }

  return (
    <View style={styles.globalContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Results</Text>
      </View>

      <View style={styles.leaderboard}>
        <ScrollView>
          {winners[0].map((user, i) => {
            return (
              <>
                <Text style={styles.userNick} key={i}>
                  {i + 1}. {user.username}
                </Text>
                <Text style={styles.userScore}>{user.score} Pts</Text>
              </>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.returnButtonContainer}>
        <TouchableOpacity
          style={styles.returnButton}
          onPress={() =>
            dispatch({
              type: GAME_REMATCH,
            })
          }
        >
          <Text style={styles.returnButtonLabel}>REMATCH</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#608efe",
    padding: 16,
    marginBottom: 16,
    borderRadius: 20,
  },
  titleContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontFamily: "iHateComicSans",
    fontSize: (windowWidth / 100) * 15,
  },
  leaderboard: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    width: (windowWidth / 100) * 80,
    padding: (windowWidth / 100) * 5,
    borderColor: "white",
    borderWidth: (windowWidth / 100) * 1,
    borderRadius: 20,
  },
  userNick: {
    color: "white",
    fontFamily: "iHateComicSans",
    fontSize: (windowWidth / 100) * 9,
    marginBottom: (windowWidth / 100) * 3,
  },
  userScore: {
    color: "#fcdd03",
    fontFamily: "iHateComicSans",
    fontSize: (windowWidth / 100) * 8,
    marginLeft: (windowWidth / 100) * 7,
    marginBottom: (windowWidth / 100) * 7,
  },
  returnButtonContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  returnButton: {
    backgroundColor: "#fcdd03",
    width: (windowWidth / 100) * 60,
    height: (windowHeight / 100) * 10,
    borderRadius: (windowWidth / 100) * 6,
    justifyContent: "center",
    alignItems: "center",
  },
  returnButtonLabel: {
    fontFamily: "iHateComicSans",
    fontSize: (windowWidth / 100) * 8,
  },
});

export default WinnersModal;
