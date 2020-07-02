import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, TouchableOpacity, Dimensions, Text } from "react-native";
import { joinRoom } from "../store/actions/socketActions";
import { RESET_USER_STATE, RESET_USER_CHAT } from "../store/actions/actionsType";

const windowWidth = Dimensions.get("window").width;

const Room = ({ id, title, room, navigation }) => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.userReducer);

  const joinRoomHandle = () => {
    dispatch({
      type: RESET_USER_STATE,
    });
    dispatch({
      type: RESET_USER_CHAT,
    });
    console.log(room);
    joinRoom({
      category: room.category,
      room: room._id,
      username,
    });

    setTimeout(() => {
      navigation.navigate("Gameplay");
    }, 3000);
  };

  return (
    <TouchableOpacity style={styles.room} onPress={joinRoomHandle}>
      <Text style={{ flex: 1, color: "white", fontSize: 20 }}>{room.name}</Text>
      <Text style={{ flex: 1, color: "white" }}>
        Category: {room.category || "General"}
      </Text>
      <Text style={{ flex: 1, color: "white" }}>
        Max Score: {room.maxScore || "General"}
      </Text>
      <Text style={{ flex: 1, color: "white" }}>Users: {room.users} / {room.capacity}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  room: {
    margin: 5,
    justifyContent: "space-evenly",
    alignItems: "center",
    width: (windowWidth / 100) * 30,
    height: (windowWidth / 100) * 30,
    borderBottomColor: "#fcdd03",
    borderStyle: "solid",
    borderBottomWidth: 3,
    padding: 3,
    backgroundColor: "#841584",
    borderRadius: 8,
    color: "#222222"
  },
});

export default Room;
