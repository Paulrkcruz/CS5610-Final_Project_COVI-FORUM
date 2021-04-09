import React, { useState, useEffect } from "react";
import AddBoards from "./../components/AddBoards";
import Boards from "./../components/Boards";
import BoardsList from "./../components/BoardsList";
import { Switch, Route, Link } from "react-router-dom";
import "./common.css";
import UserService from "../services/user.service";

const BoardModerator = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getModeratorBoard().then(
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
            </header>
        </div>
    );
};

export default BoardModerator;