import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./footer.css";
import AuthService from "./services/auth.service";
import Login from "./components/sign-in/login";
import Register from "./components/sign-up/register";
import Home from "./models/home-screen";
import Profile from "./models/profile";
import BoardUser from "./models/user";
import BoardModerator from "./models/moderator";
import BoardAdmin from "./models/admin";


const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
      <div>
        <nav className="navbar navbar-icon-top navbar-expand-lg navbar-light bg-blue">
          <Link to={"/"} className="navbar-brand">
            <a className="navbar-brand">
                </a>
              CoviForum
          </Link>


          <div className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>


            {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
            )}

            {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
            )}

            {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    User Board
                  </Link>
                </li>

            )}
          </div>

          {currentUser ? (

              <div className="navbar-right">
              <div className="navbar-nav">

                <li className="nav-item">


                  <Link to={"/profile"} className="nav-link">
                   Welcome, {currentUser.username}
                  </Link>

                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logOut}>
                    LogOut
                  </a>
                </li></div>

              </div>


          ) : (

              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>

              </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>


          <footer role="footer" >
            <div className="copyright">
              Coviforum Discussion Boards       -      Copyright © 2021
            </div>
          </footer>

        </div>


      </div>

  );

};

export default App;