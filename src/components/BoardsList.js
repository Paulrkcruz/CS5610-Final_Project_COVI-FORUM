import React, { useState, useEffect } from "react";
import BoardsDataService from "../services/BoardsService";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

const BoardsList = () => {
  const [boards, setBoards] = useState([]);
  const [currentBoards, setCurrentBoards] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
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
  };

  const retrieveBoards = () => {
    const params = getRequestParams(searchTitle, page, pageSize);

    BoardsDataService.getBoards(params)
      .then((response) => {
        const { boards, totalPages } = response.data;

        setBoards(boards);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveBoards, [page, pageSize]);

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
    BoardsDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
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
              onClick={retrieveBoards}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Our Most Popular Boards</h4>

        <div className="mt-3">
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>

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
        {/*  className="m-3 btn btn-sm btn-danger"*/}
        {/*  onClick={removeAllBoards}*/}
        {/*>*/}
        {/*  Remove All*/}
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
            <p>Please select A Board</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardsList;