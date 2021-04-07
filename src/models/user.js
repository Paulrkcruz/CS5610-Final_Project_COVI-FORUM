import React, { useState, useEffect } from "react";
import AddBoards from "./../components/AddBoards";
import Boards from "./../components/Boards";
import BoardsList from "./../components/BoardsList";
import { Switch, Route, Link } from "react-router-dom";

import UserService from "../services/user.service";

const BoardUser = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getUserBoard().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
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
                <Link to={"/add"} className="nav-link">
                    Add A Discussion Board
                </Link>
            </header>
        </div>
    );
};

export default BoardUser;