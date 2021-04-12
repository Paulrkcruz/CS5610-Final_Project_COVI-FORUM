import React, { useState } from "react";
import "./authenticate.css";
import { addUser } from "../services/user.service";
import { withRouter, Redirect } from "react-router-dom";
import SignIn from "../components/sign-in/login";
import SignUp from "../components/sign-up/register";
// Authenticate
const Authenticate = (props) => {
  const [login, setLogin] = useState(true);
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const { from } = props.location.state || { from: { pathname: "/" } };

  const loginSuccess = (data) => {
    addUser(data);
    setRedirectToReferrer(true);
  };

  const changeLoginMode = () => {
    setLogin(!login);
  };

  if (redirectToReferrer === true) {
    return <Redirect to={from} />;
  }

  return (
    <div className="auth-container">
      {login ? (
        <SignIn changeMode={changeLoginMode} success={loginSuccess} />
      ) : (
        <SignUp changeMode={changeLoginMode} success={loginSuccess} />
      )}
    </div>
  );
};

export default withRouter(Authenticate);
