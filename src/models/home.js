import React, {useState, useEffect, Component} from "react";
import AddBoards from "./../components/add-boards";
import Boards from "./../components/boards.component";
import BoardsList from "./../components/boards.list";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import BoardsDataService from "../services/boards.service";
import Pagination from "@material-ui/lab/Pagination";
import Login from "../components/sign-in/login";
const currentUser = AuthService.getCurrentUser();

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveBoards = this.retrieveBoards.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBoards = this.setActiveBoards.bind(this);
        this.removeAllBoards = this.removeAllBoards.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

        this.state = {
            boards: [],
            currentBoards: null,
            currentIndex: -1,
            searchTitle: "",

            page: 1,
            count: 0,
            pageSize: 5,
        };

        this.pageSizes = [3, 6, 9, 10];
    }

    componentDidMount() {
        this.retrieveBoards();
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle,
        });
    }
    getRequestParams(searchTitle, page, pageSize) {
        let params = {};

        if (searchTitle) {
            params["title"] = searchTitle;
        }

        if (page) {
            params["page"] = page - 1;
        }

        if (pageSize) {
            params["size"] = pageSize;
        }

        return params;
    }

    retrieveBoards() {
        const { searchTitle, page, pageSize } = this.state;
        const params = this.getRequestParams(searchTitle, page, pageSize);

        BoardsDataService.getAll(params)
            .then((response) => {
                const { boards, totalPages } = response.data;

                this.setState({
                    boards: boards,
                    count: totalPages,
                });
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveBoards();
        this.setState({
            currentBoards: null,
            currentIndex: -1,
        });
    }

    setActiveBoards(boards, index) {
        this.setState({
            currentBoards: boards,
            currentIndex: index,
        });
    }

    removeAllBoards() {
        BoardsDataService.deleteAll()
            .then((response) => {
                console.log(response.data);
                this.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    handlePageChange(event, value) {
        this.setState(
            {
                page: value,
            },
            () => {
                this.retrieveBoards();
            }
        );
    }

    handlePageSizeChange(event) {
        this.setState(
            {
                pageSize: event.target.value,
                page: 1
            },
            () => {
                this.retrieveBoards();
            }
        );
    }
            render() {
            const {
            searchTitle,
            boards,
            currentBoards,
            currentIndex,
            page,
            count,
            pageSize,
        } = this.state;

            return (

                <div className="-hacker-news-square">
                    <header className="jumbotron">
                        <h3>
                            <h3>Welcome to Coviforum, {currentUser.username}</h3>
                        </h3>
                        <i>Coviforum is a Discussion Board to speak of the struggles of the COVID-19 Pandemic</i>
                    </header>&nbsp;
                    <br />

                    <b><i>What would you like to do today?</i></b>
                    <br /><br />
                    <div className="jumbotron-fluid"/>

                    <p>View the Boards:

                        <Link to="/boards">&nbsp;
                            Post
                        </Link></p>

                    <p>Post A New Discussion Board:

                        <Link to="/add">&nbsp;
                            Post
                        </Link></p>

                    <p>View Profile:

                        <Link to="/profile">&nbsp;
                            Profile
                        </Link></p>

                    <p>Learn about COVID-19:

                        <Link to="/covidstats">&nbsp;
                            Covid Stats
                        </Link></p>

                    <b><i>Preview of todays boards:</i></b>
            <ul className="alert-info">
        {boards &&
            boards.map((boards, index) => (
            <li
            className={
            "list-group-item list-group-item- " +
            (index === currentIndex ? "active" : "")
        }
            key={index} data-toggle="modal"
            >
        {boards.description}
            </li>
            ))}
            </ul>




                        <div>
                            <br />
                        </div>
                </div>

            );
            }
            }