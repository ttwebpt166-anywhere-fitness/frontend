import { LOGGING_IN, LOGIN_SUCCESS, LOGIN_FAIL } from "../actions";

let initialState = {
  test: "test piece o' state",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGGING_IN:
      return {
        ...state,
      };
    case LOGIN_SUCCESS:
      console.log("action payload", action.payload);
      return (initialState = action.payload);

    case LOGIN_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export default reducer;
