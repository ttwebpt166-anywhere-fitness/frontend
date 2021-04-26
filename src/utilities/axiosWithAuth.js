import axios from "axios";

export const axiosWithAuth = () => {
  let token = window.localStorage.getItem("token");

  if (typeof token === "undefined") {
    window.localStorage.setItem("token", "");
    token = window.localStorage.getItem("token");
  }

  return axios.create({
    headers: {
      Authorization: `bearer ${token}`,
    },
    baseURL: "https://anywhere-fitness-server.herokuapp.com/v1",
  });
};
