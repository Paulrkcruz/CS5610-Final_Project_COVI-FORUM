import React, { useState, useEffect } from "react";
import BoardsDataService from "../services/BoardsService";
import { Link } from "react-router-dom";

const BoardsList = () => {
  const [boards, setBoardss] = useState([]);
  const [currentBoards, setCurrentBoards] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveBoards();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveBoards = () => {
    BoardsDataService.getAllBoards()
      .then(response => {
        setBoardss(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBoards();
    setCurrentBoards(null);
    setCurrentIndex(-1);
  };

  const setActiveBoards = (boards, index) => {
    setCurrentBoards(boards);
    setCurrentIndex(index);
  };

  const removeAllBoards = () => {
    BoardsDataService.removeAllBoards()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    BoardsDataService.findBoardByTitle(searchTitle)
      .then(response => {
        setBoardss(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
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
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Boards</h4>

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

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBoards}
        >
          Remove All
        </button>
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
            <p>Select a Board</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardsList;
