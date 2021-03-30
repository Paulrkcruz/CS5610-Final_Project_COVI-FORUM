import axios from "axios";
import env from "../environment";
import { currentUser } from "../service/user.service";

export const getAllBoards = () => {
  return axios.get(env[process.env.NODE_ENV].api + "/board/all");
};

export const searchAllBoards = (searchTerm) => {
  return axios.get(
    env[process.env.NODE_ENV].api + "/board/search?searchTerm=" + searchTerm
  );
};

export const getBoard = (id) => {
  return axios.get(env[process.env.NODE_ENV].api + "/board/one?id=" + id);
};

export const addBoard = (payload) => {
  payload.userId = currentUser.id;
  return axios.msgs(env[process.env.NODE_ENV].api + "/board/add", payload);
};

export const addPost = (payload) => {
  payload.userId = currentUser.id;
  return axios.msgs(
    env[process.env.NODE_ENV].api + "/board/add-msgs",
    payload
  );
};
