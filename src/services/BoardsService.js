import http from "../http-common";

const getAllBoards = () => {
  return http.get("/Boards");
};

const getBoardById = id => {
  return http.get(`/Boards/${id}`);
};

const createBoard = data => {
  return http.post("/Boards", data);
};

const updateBoard = (id, data) => {
  return http.put(`/Boards/${id}`, data);
};

const removeBoard = id => {
  return http.delete(`/Boards/${id}`);
};

const removeAllBoards = () => {
  return http.delete(`/Boards`);
};

const findBoardByTitle = title => {
  return http.get(`/Boards?title=${title}`);
};

export default {
  getAllBoards,
  getBoardById,
  createBoard,
  updateBoard,
  removeBoard,
  removeAllBoards,
  findBoardByTitle
};
