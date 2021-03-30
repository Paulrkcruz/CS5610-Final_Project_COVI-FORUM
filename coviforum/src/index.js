import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
// Services
import { getUser } from "./services/user.service";
// Pages
import Mainboard from "./pages/mainboard";
import Board from "./pages/board";
import SearchResults from "./pages/search-results";
import NewBoard from "./pages/new-board";
import Authentication from "./pages/authentication";
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
      <div role="Mainboard" id="forum-body" className="forum-body">
        <Switch>
          <Route exact path="/" component={Mainboard} />
          <AuthenticatedRoute path="./pages/new-board" component={NewBoard} />
          <Route path="./pages/board/board" component={Board} />
          <Route path="/login" component={Authentication} />
          <Route path="./pages/search-results" component={SearchResults} />
        </Switch>
      </div>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.unregister();