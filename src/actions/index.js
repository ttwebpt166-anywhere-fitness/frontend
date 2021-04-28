import { axiosWithAuth } from "../utilities/axiosWithAuth";

export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const ADD_CLASS ="ADD_CLASS"
export const SET_ERROR ="SET_ERROR"

export const fetchData = () => (dispatch) => {
  
  dispatch({ type: LOGGING_IN });
  axiosWithAuth()
    .get("/")
    .then((res) => {
      console.log("response", res.data);
      const user = { username: "Jim Morrison" };
      if (!user.username) {
        dispatch({ type: LOGIN_FAIL, payload: "Fetch Failed" });
      }
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    })

    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      });
    });
};

export const addClass = (newClass) => {
  return {
    type: ADD_CLASS,
    payload: newClass
  };
};

export const setError = (error) => {
  return { type: SET_ERROR, payload: error };
}