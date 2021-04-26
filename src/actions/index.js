import { axiosWithAuth } from "../utilities/axiosWithAuth";

export const LOGGING_IN = "LOGGING_IN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const fetchData = (dispatch) => {
  console.log("firing");
  dispatch({ type: LOGGING_IN });

  axiosWithAuth()
    .get("/")
    .then((res) => {
      console.log("response", res.data);
      const user = { username: "Bob Dylan" };
      if (!user.username) {
        dispatch({ type: LOGIN_FAIL, payload: "Unsuccesfull Fetch" });
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
