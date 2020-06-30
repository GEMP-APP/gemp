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
import {} from "../store/actions/socketActions";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const DATA = [
  // Placeholder Data for testing
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3addwa53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbwad91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-14557awd1e29d72",
    title: "Third Item",
  },
  {
    id: "bd7acbea-c1b1-46345c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-43218d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471123f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const SearchRoom = ({ navigation }) => {
  const { userNick, username } = useSelector((state) => state.userReducer);
  const { rooms } = useSelector((state) => state.roomReducer);

  const [inputSearch, setInputSearch] = useState("");
  const [roomData, setRoomData] = useState(DATA);

  let [fontsLoaded] = useFonts({
    iHateComicSans: require("../assets/fonts/IHateComicSans.ttf"),
  });

  useEffect(() => {
    let filteredData = DATA.filter((item) => {
      return item.id.includes(inputSearch);
    });

    setRoomData(filteredData);
  }, [inputSearch]);

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
        data={rooms}
        renderItem={({ item }) => (
          <Room key={item._id } id={item.category} title={item.name} room={item} navigation={navigation} />
        )}
        numColumns={3}
        horizontal={false}
      />
      <View style={styles.searchContainer}>
        <Text style={styles.searchLabel}>Search room by ID</Text>
        <TextInput
          style={styles.searchBox}
          value={inputSearch}
          onChangeText={(text) => setInputSearch(text)}
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
