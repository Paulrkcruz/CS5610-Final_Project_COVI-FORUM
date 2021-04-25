import React, { useState, useEffect } from "react";
import AddBoards from "./../components/add-boards";
import Boards from "./../components/boards.component";
import BoardsList from "./../components/boards.list";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UserService from "../services/user.service";

const Home = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getPublicContent().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/boards"]} component={BoardsList} />
                        <Route exact path="/add" component={AddBoards} />
                        <Route path="/boards/:id" component={Boards} />
                    </Switch>
                </div></header></div>



                );
};

export default Home;