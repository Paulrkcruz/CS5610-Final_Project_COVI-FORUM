import React, { useState } from "react";
import { loginUser } from "../../user";
import sha256 from "crypto-js/sha256";
// Login Msg Board
const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);
  const handlePassword = (pass) => setPassword(sha256(pass).toString());
  const handleClick = () => {
    if (username === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }
    var payload = {
      email: username,
      password: password,
    };
    loginUser(payload)
      .then((response) => {
        if (response.status === 200) {
          props.success(response.data);
        } else if (response.status === 202) {
          setError(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div onClick={props.changeMode} className="top-right-corner">
        Sign up for Coviforum
      </div>
      <h1>Login</h1>

      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          alt="email"
          autoFocus
          name="username"
          placeholder="Enter your Email.."
          type="text"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
      </div>

      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          alt="password"
          name="password"
          placeholder="Enter your Password.."
          type="password"
          onChange={(event) => handlePassword(event.target.value)}
        ></input>
      </div>

      <button aria-label="Login to Coviforum" onClick={handleClick}>
        Sign-in
      </button>

      <div className="error">{error ? error : "Error signing in. Please try again."}</div>
    </div>
  );
};

export default Login;
