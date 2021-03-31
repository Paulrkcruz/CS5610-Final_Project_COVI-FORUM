import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import './App.css';
import { getUser } from "./services/user.service";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Preferences from './components/Preferences/Preferences';
import useToken from './useToken';
import AuthenticatedRoute from "./components/authenticated-route";
import * as serviceWorker from "./serviceWorker";
import Header from "./components/header";
import Footer from "./components/footer";
import HomeScreen from "./models/home-screen";
import Thread from "./components/thread";
import NotFound from "./models/not-found";
import NewThread from "./models/new-thread";
import Authenticate from "../src/actions/index";

// Load cached user
getUser();

function App() {

    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    // eslint-disable-next-line no-undef
    ReactDOM.render(
        <React.StrictMode>
            <Router>
                <Header />
                <div role="main" id="forum-body" className="forum-body">
                    <Switch>
                        <Route exact path="/" component={HomeScreen} />
                        <AuthenticatedRoute path="/thread/new_thread" component={NewThread} />
                        <Route path="/thread/:thread" component={Thread} />
                        <Route path="/login" component={Authenticate} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
                <Footer />
            </Router>
        </React.StrictMode>,
        document.getElementById("root")
    );
}

serviceWorker.unregister();

export default App;