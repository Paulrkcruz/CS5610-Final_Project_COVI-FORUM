import React from "react";
import "./header.css";
import { Link, withRouter } from "react-router-dom";
import { currentUser, logOut } from "../../services/user.service";

const Header = (props) => {
  return (
    <header role="banner" className="active" id="scroll-header">
      <nav role="navigation" className="menu">
        <Link aria-label="Navigate to Home page" to="/">
          Home
        </Link>
        <Link aria-label="Navigate to new thread page" to="/thread/new_thread">
          New Discussion Thread
        </Link>
      </nav>
      <div className="login">
        {currentUser.id ? (
          <div>
            <div className="user">Hello {currentUser.name}</div>
            <button onClick={logOut} aria-label="Logout button">
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
            Sign-In/Sign-up
          </Link>
        )}
      </div>
    </header>
  );
};

export default withRouter(Header);
