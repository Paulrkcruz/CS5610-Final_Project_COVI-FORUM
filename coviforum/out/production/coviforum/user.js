import axios from "axios";
import environment from "../";

export const loginUser = (payload) => {
  return axios.post(
    environment[process.env.NODE_ENV].api + "/accounts/login",
    payload
  );
};

export const registerUser = (payload) => {
  return axios.post(
    environment[process.environment.NODE_ENV].api + "/accounts/signup",
    payload
  );
};
