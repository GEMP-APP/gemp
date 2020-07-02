import * as type from "../actions/actionsType";

const initialState = {
  chatMessages: [],
};

const chatReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case type.ADD_NEW_MESSAGE:
      const newChatMessages =
        state.chatMessages.length > 9 ? state.chatMessages.slice(1, 10) : state.chatMessages;
      return {
        ...state,
        chatMessages: [...newChatMessages, payload],
      };
    case type.RESET_USER_CHAT:
      return {
        ...state,
        chatMessages: [],
      };
    default:
      return state;
  }
};

export default chatReducer;
