import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { currentUser } from "../../services/user.service";
//SOURCE: https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
// Bugs but in progress
// Authentication
const Authentications = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      currentUser.id ? (
        <Component {...props} />
      ) : (
      // bugs here
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default withRouter(Authentications);
