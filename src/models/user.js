import axios from "axios";
import env from "../actions/env";

export const signInUser = (payload) => {
  return axios.post(
    env[process.env.NODE_ENV].api + "/accounts/signin",
    payload
  );
};

export const signUpUser = (payload) => {
  return axios.post(
    env[process.env.NODE_ENV].api + "/accounts/register",
    payload
  );
};
