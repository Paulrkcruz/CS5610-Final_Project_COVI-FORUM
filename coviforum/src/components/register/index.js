import React, { useState } from "react";
import { RegisterUser } from "../user";
import sha256 from "crypto-js/sha256";
// Source: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(undefined);

  const handleClick = () => {
    if (username === "" || password === "" || email === "") {
      setError("All fields must be filled..");
      return;
    }
    var payload = {
      name: username,
      email: email,
      hashed_password: password,
    };
// User sign in
    RegisterUser(payload)
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

  const handlePassword = (pass) => setPassword(sha256(pass).toString());

  return (
    <div className="container">
      <div onClick={props.changeMode} className="top-right-corner">
        Sign-in
      </div>
      <h1>Sign-up</h1>

      <div>
        <label htmlFor="name">Username: </label>
        <input
          id="name"
          alt="name"
          autoFocus
          name="name"
          placeholder="Enter your username.."
          type="text"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
      </div>

      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          alt="email"
          name="username"
          placeholder="Enter your Email"
          type="text"
          onChange={(event) => setEmail(event.target.value)}
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

      <button aria-label="Register a Coviforum Account" onClick={handleClick}>
        Sign-up
      </button>

      <div className="error">{error ? error : ""}</div>
    </div>
  );
};

export default Register;
