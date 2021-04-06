import http from "../http-common";

const getAll = () => {
  return http.get("/Boards");
};

const get = id => {
  return http.get(`/Boards/${id}`);
};

const create = data => {
  return http.post("/Boards", data);
};

const update = (id, data) => {
  return http.put(`/Boards/${id}`, data);
};

const remove = id => {
  return http.delete(`/Boards/${id}`);
};

const removeAll = () => {
  return http.delete(`/Boards`);
};

const findByTitle = title => {
  return http.get(`/Boards?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
