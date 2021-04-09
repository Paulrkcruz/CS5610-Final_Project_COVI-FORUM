import http from "../http-common";

const findAllBoards = () => {
  return http.get("/boards");
};

const findAllPublishedBoards = () => {
  return http.get("/boards");
};

const getBoards = id => {
  return http.get(`/boards/${id}`);
};

const createBoards = data => {
  return http.post("/boards", data);
};

const updateBoards = (id, data) => {
  return http.put(`/boards/${id}`, data);
};

const deleteBoards = id => {
  return http.delete(`/boards/${id}`);
};

const deleteAllBoards = () => {
  return http.delete(`/boards`);
};

const findBoardsByTitle = title => {
  return http.get(`/boards?title=${title}`);
};

export default {
  findAllBoards,
  findAllPublishedBoards,
  getBoards,
  createBoards,
  updateBoards,
  deleteBoards,
  deleteAllBoards,
  findBoardsByTitle
};
