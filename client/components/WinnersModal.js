import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { useFonts } from "@use-expo/font";
import { Easing } from "react-native-reanimated";
import { AppLoading } from "expo";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const WinnersModal = () => {
  let [fontsLoaded] = useFonts({
    iHateComicSans: require("../assets/fonts/IHateComicSans.ttf"),
  });

  const { winners } = useSelector((state) => state.userReducer);

  const dotScale1 = new Animated.Value(0);

//   useEffect(() => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(dotScale1, {
//           toValue: 1,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//         Animated.timing(dotScale1, {
//           toValue: 0,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//       ])
//     ).start();
//   }, []);

//   const dot1 = dotScale1.interpolate({
//     inputRange: [0, 1],
//     outputRange: [1, 0.5],
//   });
//   const dot2 = dotScale1.interpolate({
//     inputRange: [0, 1],
//     outputRange: [0.5, 1],
//   });

  console.log("WINEERRRSSS", winners)

  if (!fontsLoaded) {
    <AppLoading />;
  }

  return (
    <View style={styles.globalContainer}>
        <Text style={styles.message}>GAME OVER</Text>
        <Text style={styles.message}>The Winners Are : </Text>
      {/* <View
        style={{ flex: 1, justifyContent: "center", alignContent: "stretch" }}
      >
      </View> */}
      {winners.map(user => (
        <View key={user.id}>
            <Text style={styles.message}>{user.username}</Text>
            <Text style={styles.message}>{user.score}</Text>
        </View>
      ))}
      {/* <View style={styles.dotsContainer}>
        <Animated.View
          style={[
            styles.dot1,
            {
              transform: [{ scale: dot1 }],
            },
          ]}
        ></Animated.View>
        <Animated.View
          style={[
            styles.dot2,
            {
              transform: [{ scale: dot2 }],
            },
          ]}
        ></Animated.View>
        <Animated.View
          style={[
            styles.dot1,
            {
              transform: [{ scale: dot1 }],
            },
          ]}
        ></Animated.View>
        <Animated.View style={styles.dot3}></Animated.View>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "stretch",
  },
  message: {
    flex: 1,
    textAlign: "center",
    fontSize: (windowWidth / 100) * 7,
    color: "black",
    marginBottom: (windowWidth / 100) * 8,
  },
  dotsContainer: {
    flexDirection: "row",
  },
  dot1: {
    width: (windowWidth / 100) * 10,
    height: (windowWidth / 100) * 10,
    backgroundColor: "#608efe",
    borderRadius: 50,
  },
  dot2: {
    width: (windowWidth / 100) * 10,
    height: (windowWidth / 100) * 10,
    backgroundColor: "#fcdd03",
    borderRadius: 50,
  },
});

export default WinnersModal;
