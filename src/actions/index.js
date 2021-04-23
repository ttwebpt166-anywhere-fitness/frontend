import axios from "axios";

export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const fetchData = () => (dispatch) => {
  console.log("firing");
  dispatch({ type: LOGGING_IN });

  axios
    .get(`https:pokeapi.com`)
    .then((res) => {
      console.log("response", res.data);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    })

    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: err,
      });
    });
};
