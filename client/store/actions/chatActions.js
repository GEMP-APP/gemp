import * as type from "./actionsType";

export const addNewMessage = (payload) => {
  return {
    type: type.ADD_NEW_MESSAGE,
    payload
  };
};