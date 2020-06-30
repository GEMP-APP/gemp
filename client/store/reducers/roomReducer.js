import * as type from "../actions/actionsType";

const initialState = {
  rooms: [],
  getRoomsLoading: false,
  getRoomsError: null,
  roomId: "",
  roomUsers: []
};

const roomReducer = (state = initialState, action) => {
  const { payload } = action;
  switch (action.type) {
    case type.FETCH_ROOMS_REQUEST:
      return {
        ...state,
        getRoomsLoading: true,
      };
    case type.FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        getRoomsLoading: false,
        rooms: payload.rooms,
      };
    case type.FETCH_ROOMS_FAILURE:
      return {
        ...state,
        getRoomsLoading: false,
        getRoomsError: payload.errMessage,
      };
    case type.UPDATE_ROOM_USERS:
      return {
        ...state,
        roomUsers: payload.users.sort((a, b) => a.score - b.score),
        roomId: payload.room
      }
    default:
      return state;
  }
};

export default roomReducer;
