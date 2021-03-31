import React, { useState } from "react";
import { signInUser } from "../../models/user";
import sha256 from "crypto-js/sha256";
// SOURCE: https://bezkoder.com/react-hooks-redux-login-registration-example/

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(undefined);

    const handlePassword = (pass) => setPassword(sha256(pass).toString());

    const handleClick = () => {
        if (username === "" || password === "") {
            setError("All fields must be filled to continue.");
            return;
        }
        const payload = {
            email: username,
            password: password,
        };

        signInUser(payload)
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
                Sign-up
            </div>

            <h1>Sign-in</h1>

            <div>
                <label htmlFor="email">Email: </label>
                <input
    id="email"
    alt="email"
    autoFocus
    name="username"
    placeholder="Enter your Email"
    type="text"
    onChange={(event) => setUsername(event.target.value)}
    />
            </div>

            <div>
                <label htmlFor="password">Password: </label>
                <input
    id="password"
    alt="password"
    name="password"
    placeholder="Enter your Password"
    type="password"
    onChange={(event) => handlePassword(event.target.value)}
    />
            </div>

            <button aria-label="Sign into Coviforum" onClick={handleClick}>
                Sign-in
            </button>

            <div className="Error logging in. Please try again.">{error ? error : ""}</div>
        </div>


    );

};

export default Login;