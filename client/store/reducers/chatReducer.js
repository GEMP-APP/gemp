import * as type from "../actions/actionsType";

const initialState = {
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case type.ADD_NEW_MESSAGE:
      const newMessages =
        state.messages.length > 9 ? state.messages.slice(1, 10) : state.messages;
      return {
        ...state,
        messages: [...newMessages, payload],
      };
    default:
      return state;
  }
};

export default chatReducer;
