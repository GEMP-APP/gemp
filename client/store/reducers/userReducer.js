import * as type from "../actions/actionsType";

const initialState = {
  username: "",
  userId: "",
  userNick: "",
  roomData: [],
  drawingMode: false,
  waitingMode: false,
  roomMaster: false,
  isPlaying: true,
  words: [],
  gameFinish: false,
  winners: [],
};

const userReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case type.SET_USER_STATE:
      return {
        ...state,
        username: payload.username,
        userId: payload.id,
      };
    case type.GAME_FINISH:
      return {
        ...state,
        gameFinish: true,
        winners: payload.users,
      };
    case type.RESET_USER_STATE:
      return {
        ...state,
        drawingMode: false,
        waitingMode: false,
        roomMaster: false,
        isPlaying: true,
        words: [],
        gameFinish: false,
        winners: []
      };
    case type.SET_USER_MASTER:
      return {
        ...state,
        roomMaster: true,
        isPlaying: false,
      };
    case type.SET_USER_GAME_START:
      return {
        ...state,
        roomMaster: false,
        isPlaying: true,
      };
    case type.USER_DRAW_TURN:
      return {
        ...state,
        isPlaying: true,
        drawingMode: payload,
        waitingMode: true,
      };
    case type.USER_DRAW_START:
      return {
        ...state,
        isPlaying: true,
        waitingMode: false,
      };
    case type.USER_SET_WORDS:
      return {
        ...state,
        isPlaying: true,
        waitingMode: true,
        words: payload,
      };
    case "changeUserNick":
      console.log("changing user nickname..");
      return {
        ...state,
        userNick: payload.userNick,
        username: payload.userNick,
      };
    case "resetUserNick":
      console.log("resetting user nickname..");
      return { ...state, userNick: "" };
    case "storeRoomData":
      console.log("storing room data..");
      return { ...state, roomData: payload.roomData };
    case "resetRoomData":
      console.log("resetting room data..");
      return { ...state, roomData: [] };
    default:
      return state;
  }
};

export default userReducer;
