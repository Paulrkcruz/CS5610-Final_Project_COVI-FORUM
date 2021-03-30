import { deleteCookie, getCookie, setCookie } from "./cookie.service";
// Set cookie name
const COOKIE_NAME = "coviforum";
const addUser = (user) => {
  Object.assign(currentUser, user);
  setCookie(COOKIE_NAME, JSON.stringify(currentUser), 1);
};
// Get Cookie User name
const getUser = () => {
  if (!initialLoad) {
    let cookie = getCookie(COOKIE_NAME);
    if (cookie) {
      try {
        cookie = JSON.parse(cookie);
      } catch (error) {
        console.log("User cache cannot be loaded. Please refresh your browser.");
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

export { currentUser, addUser, getUser, logOut };
