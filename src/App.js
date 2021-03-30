import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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
// Load cached user
getUser();

function App() {

    const { token, setToken } = useToken();

    if(!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className="wrapper">
            <h1>Application</h1>
            <BrowserRouter>
                <Switch>
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/preferences">
                        <Preferences />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

serviceWorker.unregister();

export default App;