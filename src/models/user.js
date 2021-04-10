import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "./common.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
        <div className="submit-form">
            <header className="jumbotron">
                <h3>{content}</h3>
                <Link to={"/addBoard"} className="nav-link">
                    Edit Profile
                </Link>
                <Link to={"/addBoard"} className="nav-link">
                    View All Posted Boards
                </Link>
                <Link to={"/addBoard"} className="nav-link">
                    Search For Boards
                </Link>
                <Link to={"/addBoard"} className="nav-link">
                    Deactivate Membership
                </Link>
                <Link to={"/addBoard"} className="nav-link">
                    About Us
                </Link>
                <Link to={"/addBoard"} className="nav-link">
                    License Terms
                </Link>

            </header>
        </div>
    );
};

export default BoardUser;