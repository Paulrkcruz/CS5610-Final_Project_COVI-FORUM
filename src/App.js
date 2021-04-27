import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/sign-in/login";
import Register from "./components/sign-up/register";
import CovidStats from "../src/covid-stats/covidstats"
import Profile from "./models/profile";
import BoardUser from "./models/user";
import BoardModerator from "./models/moderator";
import BoardAdmin from "./models/admin";
import PubBoards from "./components/pub-boards";
import AddBoards from "./components/add-boards";
import Boards from "./components/boards.component";
import BoardsList from "./components/boards.list";
import Home from "./models/home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
        <nav className="navbar navbar-icon-top navbar-expand-sm navbar-black bg-light">
          <Link to={"/pubBoards"} className="navbar-brand">
            <a className="navbar-brand">
              <img src="././coviforum_icon.png" alt="logo" height={35} width={35} />

              <b>CoviForum</b>
            </a>

          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item active">

            </li>


            <Link to={"/covidStats"} className="nav-link">
              Covid-19 Stats
            </Link>


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

                </li>

            )}
          </div>

          {currentUser ? (

                  <div className="navbar-nav">

                      <Link to={"/home"} className="nav-link">
                        Home
                      </Link>

                    <Link to={"/boards"} className="nav-link">
                      Boards
                    </Link>

                  <li className="navbar-left">
                    <Link to={"/add"} className="nav-link">
                      Post
                    </Link>
                  </li>
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
            <Route exact path={["/home", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/pubBoards" component={PubBoards} />
            <Route exact path={["/", "/boards"]} component={BoardsList} />
            <Route exact path="/add" component={AddBoards} />
            <Route path="/boards/:id" component={Boards} />
            <Route path="/covidStats" component={CovidStats} />
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