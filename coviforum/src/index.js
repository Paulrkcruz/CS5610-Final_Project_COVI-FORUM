import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
// Services
import { getUser } from "./services/user.service";
// Pages
import Feed from "./pages/mainboard";
import Thread from "./pages/board";
import NotFound from "./pages/search-results";
import NewThread from "./pages/new-board";
import Authenticate from "./pages/authenticatione";
// Components
import Header from "./components/header";
import Footer from "./components/footer";
// Authenticated Routes
import AuthenticatedRoute from "./components/authentications";
// Load user from cache
// SOURCE: https://www.npmjs.com/package/react-use-cache
getUser();
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <div role="main" id="forum-body" className="forum-body">
        <Switch>
          <Route exact path="/" component={Feed} />
          <Route path="/stats" component={Stats} />
          <AuthenticatedRoute path="/board/new_board" component={NewThread} />
          <Route path="/board/:board" component={Thread} />
          <Route path="/login" component={Authenticate} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.unregister();
