import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { currentUser } from "../../services/user.service";

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      currentUser.id ? (
        <Component {...props} />
      ) : (
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

export default withRouter(AuthenticatedRoute);
