import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }
    render() {
        const { currentUser } = this.state;

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong> Profile
                    </h3>
                    <p>
                        <strong>Member Since: </strong>{" "} 2021
                    </p>
                </header>
                <p>
                    <strong>Web Token:</strong>{" "}
                    {currentUser.accessToken.substring(0, 20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                </p>
                <p>
                    <strong>User ID:</strong>{" "}
                    {currentUser.id}
                </p>
                <p>
                    <strong>Registered Email Address:</strong>{" "}
                    {currentUser.email}
                </p>
                <strong>User Role:</strong>
                <ul>
                    {currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                </ul>
            </div>
        );
    }
}