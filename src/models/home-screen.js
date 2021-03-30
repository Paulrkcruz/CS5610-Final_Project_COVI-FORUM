import React, { useEffect, useState } from "react";
import "./home-screen.css";
import { getAllThreads, searchAllThreads } from "./thread";
import ThreadList from "../components/thread-list";
import PageHead from "../components/page-head";
import { Link } from "react-router-dom";
import SearchBar from "../components/search-bar";
import ReactPaginate from "react-paginate";

const HomeScreen = (props) => {
  const [threads, setThreads] = useState([]);
  const [searchThreads, setSearchThreads] = useState([]);
  const [visibleThreads, setVisibleThreads] = useState([]);

  const [dataAvailable, setDataAvailable] = useState(false);
  const [searchDone, setSearchDone] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;

  const triggerSearch = () => {
    if (searchTerm !== "") {
      onSearch(searchTerm);
    } else {
      setSearchThreads(threads);
    }
  };

  useEffect(() => {
    if (searchThreads.length > 0) {
      // search list
      const currentPageData = searchThreads.slice(offset, offset + PER_PAGE);
      setVisibleThreads(currentPageData);
    } else {
      const currentPageData = threads.slice(offset, offset + PER_PAGE);
      setVisibleThreads(currentPageData);
    }
  }, [threads, searchThreads, offset]);

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  useEffect(() => {
    getAllThreads()
      .then((response) => {
        // Insert users
        setThreads(response.data);
        setDataAvailable(true);
      })
      .catch((err) => {
        console.error("Load error. Please try again.", err);
      });
  }, []);

  const onSearch = (term) => {
    setDataAvailable(false);
    searchAllThreads(term)
      .then((response) => {
        // Insert users
        setSearchThreads(response.data);
        setDataAvailable(true);
        setSearchDone(true);
      })
      .catch((err) => {
        console.error("Load error. Please try again.", err);
      });
  };

  const resetSearch = () => {
    setSearchTerm("");
    setSearchThreads([]);
    setSearchDone(false);
  };

  return (
    <div className="home-screen">
      <PageHead className="title" title="Home" />

      <div className="container">
        {
          // Show loader until we load the user list
          dataAvailable ? (
            <React.Fragment>
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={Math.ceil(
                  (searchThreads.length > 0
                    ? searchThreads.length
                    : threads.length) / PER_PAGE
                )}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
              <ThreadList threads={visibleThreads} />
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={Math.ceil(
                  (searchThreads.length > 0
                    ? searchThreads.length
                    : threads.length) / PER_PAGE
                )}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
            </React.Fragment>
              // eslint-disable-next-line react/jsx-no-undef
          ) : (<Loader
              type="Puff"
              color="#4f5d75"
              height={100}
              width={100}
              className="loader"/>
          )
        }
      </div>

      <div className="aside">
        <Link to="/thread/new_thread">
          <div className="create-new-thread">Create new thread</div>
        </Link>
        <SearchBar
          value={searchTerm}
          search={triggerSearch}
          onSearch={setSearchTerm}
        />
        {searchDone ? (
          <button onClick={resetSearch} className="search-info">
            {searchThreads.length > 0 ? "Reset search" : "No threads found"}
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
