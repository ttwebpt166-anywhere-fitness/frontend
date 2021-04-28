import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      Authorization: `bearer ${token}`,
    },
    baseURL: 'https://anywhere-fitness-server.herokuapp.com/v1'
  });
};
