import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { useFonts } from "@use-expo/font";
import Room from "../components/RoomComponent";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// const DATA = [
//   // Placeholder Data for testing
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     category: "animals",
//     name: "Animals",
//   },
// ];

const SearchRoom = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    iHateComicSans: require("../assets/fonts/IHateComicSans.ttf"),
  });

  const { userNick, username } = useSelector((state) => state.userReducer);
  const { rooms } = useSelector((state) => state.roomReducer);

  const [inputSearch, setInputSearch] = useState("");
  const [roomList, setRoomList] = useState([]);

  const filterRoomHandle = (text) => {
    setInputSearch(text);
    let filteredRoom = rooms.filter((room) => {
      return room.name.includes(inputSearch);
    });

    setRoomList(filteredRoom);
  };

  console.log(rooms[0])
  console.log(roomList[0])

  return (
    <View style={styles.globalContainer}>
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.welcomeText}>
          Welcome,
          <Text style={styles.userNick}> {userNick}</Text>
        </Text>
        <Text style={styles.welcomeText}>Tap the rooms below to join!</Text>
      </View>

      <FlatList
        style={styles.roomContainer}
        data={inputSearch ? roomList : rooms}
        renderItem={({ item }) => (
          <Room key={item._id } id={item._id} title={item.name} room={item} navigation={navigation} />
        )}
        keyExtractor={item => String(item._id)}
        numColumns={3}
        horizontal={false}
      />
      
      <View style={styles.searchContainer}>
        <Text style={styles.searchLabel}>Search room by ID</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.searchBox}
          value={inputSearch}
          onChangeText={(text) => filterRoomHandle(text)}
        />
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
  },
  welcomeTextContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    color: "white",
    fontFamily: "iHateComicSans",
    fontSize: (windowWidth / 100) * 8,
  },
  userNick: {
    color: "#fcdd03",
  },
  roomContainer: {
    flex: 1.5,
    width: (windowWidth / 100) * 100,
    height: (windowHeight / 100) * 50,
  },
  searchContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBox: {
    fontFamily: "iHateComicSans",
    fontSize: (windowWidth / 100) * 6,
    backgroundColor: "white",
    width: (windowWidth / 100) * 80,
    height: (windowHeight / 100) * 8,
    textAlign: "center",
    borderRadius: 20,
  },
  searchLabel: {
    color: "white",
    fontFamily: "iHateComicSans",
    fontSize: (windowWidth / 100) * 8,
  },
});

export default SearchRoom;
