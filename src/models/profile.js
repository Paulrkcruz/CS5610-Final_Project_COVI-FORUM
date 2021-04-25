import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="navbar-right">
      <header className="jumbotron">
        <h3>
          <h3>{currentUser.username}</h3> Profile
        </h3>
      </header>
        <p>
            <strong>Account Status:</strong> Active
        </p>
        <p>
            <strong>Member Since:</strong> {currentUser.createdAt}
        </p>
      <p>
        <strong>Web Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>User ID:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email Address:</strong> {currentUser.email}
      </p>
      <strong>User Role:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)} ROLE_USER
      </ul>
    </div>
  );
};

export default Profile;