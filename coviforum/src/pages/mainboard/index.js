import React, { useEffect, useState } from "react";
import "./mainboard.css";
import { getAllBoards, searchAllBoards } from "./board";
import BoardList from "../../components/board-msgs";
import Loader from "react-loader-spinner";
import PageHead from "../../components/header-view";
import { Link } from "react-router-dom";
import SearchBar from "../../components/search";
import ReactPaginate from "react-paginate";
//SOURCE FOR HELP: https://medium.com/developer-circle-kampala/how-to-create-a-simple-search-app-in-react-df3cf55927f5

//Mainboard sets up the main board of the application
const Mainboard = (props) => {
  const [boards, setBoards] = useState([]);
  const [searchBoards, setSearchBoards] = useState([]);
  const [visibleBoards, setVisibleBoards] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 15;
  const offset = currentPage * PER_PAGE;
  const triggerSearch = () => {
    if (searchTerm !== "") {
      onSearch(searchTerm);
    } else {
      setSearchBoards(boards);
    }
  };
  useEffect(() => {
    if (searchBoards.length > 0) {
      // search list
      const currentPageData = searchBoards.slice(offset, offset + PER_PAGE);
      setVisibleBoards(currentPageData);
    } else {
      const currentPageData = boards.slice(offset, offset + PER_PAGE);
      setVisibleBoards(currentPageData);
    }
  }, [boards, searchBoards, offset]);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
// Set Pagination
  useEffect(() => {
    getAllBoards()
      .then((response) => {
        setBoards(response.data);
        setDataAvailable(true);
      })
      .catch((err) => {
        console.error("ERROR: Cannot display board messages. Please refresh this webpage.", err);
      });
  }, []);
// Search
// Display users
  const onSearch = (term) => {
    setDataAvailable(false);
    searchAllBoards(term)
      .then((response) => {
        setSearchBoards(response.data);
        setDataAvailable(true);
        setSearchDone(true);
      })
      .catch((error_loading) => {
        console.error("ERROR: Cannot display board messages. Please refresh this webpage.", error_loading);
      });
  };
// Reset search terms
  const resetSearch = () => {
    setSearchTerm("");
    setSearchBoards([]);
    setSearchDone(false);
  };
  return (
  // Setup main board page
    <div className="Mainboard">
      <PageHead className="title" title="Home" />
// Container for main page
      <div className="container">
        {
          dataAvailable ? (
            <React.Fragment>
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={Math.ceil(
                  (searchBoards.length > 0
                    ? searchBoards.length
                    : boards.length) / PER_PAGE
                )}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
              <BoardList boards={visibleBoards} />
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={Math.ceil(
                  (searchBoards.length > 0
                    ? searchBoards.length
                    : boards.length) / PER_PAGE
                )}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
            </React.Fragment>
          ) : (
            <Loader
              type="Puff"
              color="#4f5d75"
              height={100}
              width={100}
              className="loader"
            />
          )
        }
      </div>
      <div className="aside">
        <Link to="/board/new_board">
          <div className="create-new-board">Create New Message Board</div>
        </Link>
        <SearchBar
          value={searchTerm}
          search={triggerSearch}
          onSearch={setSearchTerm}
        />
        {searchDone ? (
          <button onClick={resetSearch} className="search-info">
            {searchBoards.length > 0 ? "Reset" : "No boards to display."}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Mainboard;
