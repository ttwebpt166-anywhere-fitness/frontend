import { combineReducers } from "redux";
import {
  LOGGING_IN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ADD_CLASS,
  SET_ERROR,
} from "../actions";

let initialState = {
  test: "test piece o' state",
  isLoading: false,
  error: "",
  data: undefined,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGGING_IN:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case LOGIN_SUCCESS:
      console.log("action payload", action.payload);
      return { ...state, data: action.payload, isLoading: false, error: "" };

    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        data: undefined,
      };
    case ADD_CLASS:
      return {
        ...state,
        newClass: [
          ...state.newClass,
          {
            id: Date.now(),
            
          },
        ],
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({ user: userReducer });
