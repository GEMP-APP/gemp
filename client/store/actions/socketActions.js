import * as type from "./actionsType";
import ioClient from "socket.io-client";

let socket

const gempAPI = "http://192.168.1.2:4000";

export function connectToSocket() {
  return (dispatch) => {
    socket = ioClient(gempAPI);
    socket.on("Connected", (payload) => {
      dispatch({
        type: type.SET_USER_STATE,
        payload
      });
      dispatch({
        type: type.SOCKET_CONNECTED,
        payload: {
          socket,
        },
      });
      socket.emit("ping");
    });

    socket.on("loginSuccess", (payload) => {
      console.log({ payload });
    });

    socket.on("newMessage", (payload) => {
      dispatch({
        type: type.ADD_NEW_MESSAGE,
        payload
      })
    });

    socket.on("roomUsers", (payload) => {
      dispatch({
        type: type.UPDATE_ROOM_USERS,
        payload
      })
    })

    // console.log("SMAPAI SINI LHO");
  };
}

export function joinRoom(payload) {
  const { room, username, category } = payload
  socket.emit("joinRoom", {
    room, username, category
  })
}