import axios from "axios";

const setAuthToken = () => {
  let token = localStorage.getItem("__ros__listing__token") || null;

  if (token) {
    axios.defaults.headers.common.Authorization = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default setAuthToken;
