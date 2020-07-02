import * as type from "./actionsType";
import ioClient from "socket.io-client";

let socket;

const gempAPI = "http://54.169.11.236:4000";

export function connectToSocket() {
  return (dispatch) => {
    // if (socket.connect) socket.disconnect()
    socket = ioClient(gempAPI);
    socket.on("Connected", (payload) => {
      dispatch({
        type: type.SET_USER_STATE,
        payload,
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
        payload,
      });
    });

    socket.on("roomUsers", (payload) => {
      dispatch({
        type: type.UPDATE_ROOM_USERS,
        payload,
      });

      if (payload.users.length === 1) {
        dispatch({
          type: type.SET_USER_MASTER,
        });
      }
    });

    socket.on("drawTurn", ({ id, username }) => {
      console.log({
        socketId: socket.id,
        drawerId: id,
      });

      if (id === socket.id) {
        socket.emit("getWords");
        dispatch({
          type: type.USER_DRAW_TURN,
          payload: true,
        });
      } else {
        dispatch({
          type: type.USER_DRAW_TURN,
          payload: false,
        });
        dispatch({
          type: type.ADD_NEW_MESSAGE,
          payload: {
            username: "Gemp Bot",
            message: `${username} turn to draw.`,
            type: "bot",
          },
        });
      }
    });

    socket.on("getWords", (payload) => {
      console.log(payload);
      dispatch({
        type: type.USER_SET_WORDS,
        payload,
      });
    });

    socket.on("startDraw", () => {
      dispatch({
        type: type.USER_DRAW_START,
      });
    });

    socket.on("userHit", (payload) => {
      dispatch({
        type: type.ADD_NEW_MESSAGE,
        payload,
      });
    });

    socket.on("youHit", (payload) => {
      dispatch({
        type: type.ADD_NEW_MESSAGE,
        payload,
      });
    });

    socket.on("gameFinish", (users) => {
      console.log("YEY FINISH! AUTO REMATCH YA")
      console.log("HERE ARE THE WINNERS", users)
      dispatch({
        type: type.GAME_FINISH,
        payload: {
          users
        }
      })
    })

    socket.on("getRooms", (payload) => {
      console.log("ROMS", payload)
      dispatch({
        type: type.FETCH_ROOMS_SUCCESS,
        payload: {
          rooms: payload,
        },
      });
    })

    // console.log("SMAPAI SINI LHO");
  };
}

export function joinRoom(payload) {
  const { room, username, category } = payload;
  if (socket) {
    socket.emit("joinRoom", {
      room,
      username,
      category,
    });
  } else {
    connectToSocket()
    socket.emit("joinRoom", {
      room,
      username,
      category,
    });
  }
}

export function gameStart() {
  socket.emit("gameStart");
  return {
    type: type.SET_USER_GAME_START,
  };
}

export function setWord(word) {
  socket.emit("setWord", word);
}

export function checkAnswer(word) {
  console.log({ kirimJawaban: word });
  socket.emit("checkAnswer", word);
}
