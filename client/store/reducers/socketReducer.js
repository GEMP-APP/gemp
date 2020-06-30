import * as type from "../actions/actionsType";

const initialState = {
  socket: undefined,
};

const socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SOCKET_CONNECTED:
      return {
        ...state,
        socket: action.payload.socket,
      };
    default:
      return state;
  }
};

export default socketReducer;
