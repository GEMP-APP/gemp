import axios from "axios";
import * as type from "./actionsType";

export const appStart = () => {
  return (dispatch) => {
    dispatch(fetchRooms());
  };
};

export const fetchRooms = () => {
  return (dispatch) => {
    dispatch(fetchRoomsRequest());
    axios(`http://192.168.1.2:4000/rooms`)
      .then(({ data }) => {
        console.log({dataRoom: data})
        dispatch({
          type: type.FETCH_ROOMS_SUCCESS,
          payload: {
            rooms: data,
          },
        });
      })
      .catch((err) => {
        console.log({errorRoom: err})
        dispatch({
          type: type.FETCH_ROOMS_FAILURE,
          payload: {
            errMessage: err.message,
          },
        });
      });
  };
};

export const fetchRoomsRequest = () => {
  return {
    type: type.FETCH_ROOMS_REQUEST,
  };
};
