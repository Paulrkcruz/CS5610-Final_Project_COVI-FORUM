import React, {Component, useState} from "react";
import BoardsDataService from "../services/boards.service";
import { Link } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

export default class BoardsList extends Component {
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
      pageSize: 10,
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
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            /><br></br>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.retrieveBoards}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Trending</h4>

          <div className="mt-3">
            {"Boards per Page: "}
            <select onChange={this.handlePageSizeChange} value={pageSize}>
              {this.pageSizes.map((size) => (
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
              onChange={this.handlePageChange}
            />
          </div>

          <ul className="list-group">
            {boards &&
              boards.map((boards, index) => (
                <li
                  className={
                    "list-group-item list-group-item- " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBoards(boards, index)}
                  key={index} data-toggle="modal"
                >
                  {boards.title}
                </li>
              ))}
          </ul>


          {/*<button*/}
          {/*  className="m-3 btn btn-sm btn-danger"*/}
          {/*  onClick={this.removeAllBoards}*/}
          {/*>*/}
          {/*  Remove All*/}
          {/*</button>*/}
        </div>
        <div className="col-md-6">
          {currentBoards ? (
            <div>
              <h4></h4>
              <div>
                <label>
                  <label><b>Title:</b></label>
                </label>{" "}
               <h3> {currentBoards.title}</h3>
              </div>
              <div>
                <label>
                  <label><b>Post:</b></label>
                </label>{" "}
               <h3> {currentBoards.description}</h3>
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
               <i> {currentBoards.published ? "Published" : "Pending"}</i>
              </div>
              <div className="alert-link">


              <Link
                to={"/boards/" + currentBoards.id}
                className="badge badge-warning">
                Edit
              </Link>


              </div>
              </div>
          ) : (
              <div>
              <br />
            </div>
          )}
        </div>
      </div>
    );
  }
}