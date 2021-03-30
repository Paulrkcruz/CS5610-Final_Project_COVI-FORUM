import React, { useState } from "react";
import "./authentication.css";
import { addUser } from "../../services/user.service";
import { withRouter, Redirect } from "react-router-dom";
import Login from "../../components/login";
import Register from "../../components/register";

// Authenticate users
const Authenticate = (props) => {
  const [login, setLogin] = useState(true);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { from } = props.location.state || { from: { pathname: "/" } };

  const loginSuccess = (data) => {
    addUser(data);
    setRedirectToReferrer(true);
  };
// Set login mode
  const changeLoginMode = () => {
    setLogin(!login);
  };
  if (redirectToReferrer === true) {
    return <Redirect to={from} />;
  }
// Return login results
// add error handling
  return (
    <div className="authentication">
      {login ? (
        <Login changeMode={changeLoginMode} success={loginSuccess} />
      ) : (
        <Register changeMode={changeLoginMode} success={loginSuccess} />
      )}
    </div>
  );
};

export default withRouter(Authenticate);
