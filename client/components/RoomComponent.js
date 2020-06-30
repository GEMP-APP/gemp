import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, TouchableOpacity, Dimensions, Text } from "react-native";
import { joinRoom } from "../store/actions/socketActions";
import { RESET_USER_STATE } from "../store/actions/actionsType";

const windowWidth = Dimensions.get("window").width;

const Room = ({ id, title, room, navigation }) => {
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.userReducer);

  const joinRoomHandle = () => {
      dispatch({
          type: RESET_USER_STATE
      })
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
      <Text style={{ flex: 1, color: "white" }}>{id ? id : "no id"}</Text>
      <Text style={{ flex: 1, color: "white" }}>
        title: {title ? title : "no title"}
      </Text>
      <Text style={{ flex: 1, color: "white" }}>0 / 4</Text>
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
  },
});

export default Room;
