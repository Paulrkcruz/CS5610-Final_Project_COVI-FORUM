import React from "react";
import "./header.css";
import { Link, withRouter } from "react-router-dom";
import { currentUser, logOut } from "../../services/user.service";

// Web page header
const Header = (props) => {
  // Add Links and buttons
  return (
    <header role="banner" className="active" id="scroll-header">
      <nav role="navigation" className="menu">
        <Link aria-label="Home Page" to="/">
          Home
        </Link>
        <Link aria-label="New Board Page" to="/board/new_board">
          Create New Board
        </Link>
      </nav>
      <div className="login">
        {currentUser.id ? (
          <div>
            <div className="user">Welcome, {currentUser.name}</div>
            <button onClick={logOut} aria-label="Logout">
              {" "}
              Logout{" "}
            </button>
          </div>
        ) : (
          <Link
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          >
            Sign-In or Sign-up
          </Link>
        )}
      </div>
    </header>
  );
};
export default withRouter(Header);
