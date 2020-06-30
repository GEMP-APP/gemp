import * as type from "../actions/actionsType";

const initialState = {
  username: "",
  userId: "",
  userNick: "",
  roomData: [],
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
    case "changeUserNick":
      console.log("changing user nickname..");
      return {
        ...state,
        userNick: payload.userNick,
        username: payload.userNick
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
