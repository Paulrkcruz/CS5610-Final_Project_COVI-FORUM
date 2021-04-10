import React, { useState, useEffect } from "react";
import BoardsDataService from "../services/BoardsService";
import { Link } from "react-router-dom";

const BoardsList = () => {
    const [boards, setBoards] = useState([]);
    const [currentBoards, setCurrentBoards] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        findAllBoards();
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const findAllBoards = () => {
        BoardsDataService.findAllBoards()
            .then(response => {
                setBoards(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        findAllBoards();
        setCurrentBoards(null);
        setCurrentIndex(-1);
    };

    const setActiveBoards = (boards, index) => {
        setCurrentBoards(boards);
        setCurrentIndex(index);
    };

    const deleteAllBoards = () => {
        BoardsDataService.deleteAllBoards()
            .then(response => {
                console.log(response.data);
                refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findBoardsByTitle = () => {
        BoardsDataService.findByTitle(searchTitle)
            .then(response => {
                setBoards(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list-row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findBoardsByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="list-row">
                <h4>Most Popular Boards</h4>

                <ul className="list-group">
                    {boards &&
                    boards.map((boards, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveBoards(boards, index)}
                            key={index}
                        >
                            {boards.title}
                        </li>
                    ))}
                </ul>

                {/*<button*/}
                {/*    className="m-3 btn btn-sm btn-danger"*/}
                {/*    onClick={deleteAllBoards}*/}
                {/*>*/}
                {/*    Remove All*/}
                {/*</button>*/}
            </div>
            <div className="col-md-6">
                {currentBoards ? (
                    <div>
                        <h4>Boards</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentBoards.title}
                        </div>
                        <div>
                            <label>
                                <strong>Description:</strong>
                            </label>{" "}
                            {currentBoards.description}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentBoards.published ? "Published" : "Pending"}
                        </div>

                        <Link
                            to={"/boards/" + currentBoards.id}
                            className="badge badge-warning"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardsList;