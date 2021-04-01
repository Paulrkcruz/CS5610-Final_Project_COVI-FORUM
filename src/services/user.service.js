import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from "./cookie.service";
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {

  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', {headers: authHeader()});
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', {headers: authHeader()});
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', {headers: authHeader()});
  }


}
const
    COOKIE_NAME = "coviforum";
// Should have the following properties
/*
    this.id
    this.name
    this.created
    this.updated
    this.email
    this.active
*/
  const addUser = (user) => {
    Object.assign(currentUser, user);
    setCookie(COOKIE_NAME, JSON.stringify(currentUser), 1);
  };

  const getUser = () => {
    if (!initialLoad) {
      let cookie = getCookie(COOKIE_NAME);
      if (cookie) {
        try {
          cookie = JSON.parse(cookie);
        } catch (error) {
          console.log("Failed to load cached user");
        }
        addUser(cookie);
      }
      initialLoad = true;
    }
    return currentUser;
  };

  const logOut = () => {
    Object.assign(currentUser);
    deleteCookie(COOKIE_NAME);
    window.location.href = "/";
  };

  let initialLoad = false;
  const currentUser = {};

export default new UserService();
export { currentUser, addUser, getUser, logOut };