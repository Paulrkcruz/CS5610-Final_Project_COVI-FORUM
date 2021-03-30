import React, { useState, useEffect } from "react";
import "./board.css";
import { withRouter, Redirect } from "react-router-dom";
import { getBoard } from "./board";
import Loader from "react-loader-spinner";
import MsgList from "../../components/board-msgs";
import NewMsg from "../../components/msgs";
import Board from "../../components/board";
import ReactPaginate from "react-paginate";
// SOURCE FOR HELP: https://medium.com/@samwsoftware/building-a-forum-with-react-and-node-242a2a3c2995
// BoardPage
// Allows users to see the webpage with message boards
const BoardPage = (props) => {
// Set state
  const [id, setId] = useState(undefined);
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [boardLoaded, setBoardLoaded] = useState(false);
  const [board, setBoard] = useState({});
  const [msgs, setMsgs] = useState([]);
  const [visibleMsgs, setVisibleMsgs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
// Handle clicks
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
// Setup Board Page
  const initialSetup = () => {
    if (
      props.location &&
      props.location.state &&
      props.location.state.boardId
    ) {
      setId(props.location.state.boardId);
    } else if (props.match && props.match.params && props.match.params.board) {
      setId(props.match.params.board);
    } else {
      setRedirectToHome(true);
    }
  };
// Set effects
  useEffect(initialSetup, []);
  useEffect(() => {
    const currentPageData = msgs.slice(offset, offset + PER_PAGE);
    setVisibleMsgs(currentPageData);
  }, [currentPage, offset, msgs]);

  useEffect(() => {
    const getMsgs = () => {
      getBoard(id)
        .then((response) => {
          if (response.status === 200) {
            if (
              response.data &&
              response.data.length &&
              response.data.length > 0
            ) {
              const temp = response.data[0];
              temp.post = response.data[0].msgs[0];
              temp.count = response.data[0].msgs.length;

              setBoard(temp);
              setMsgs(response.data[0].msgs);
              setBoardLoaded(true);
            }
          } else if (response.status === 202) {
            console.error("error", response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    if (id) {
      getMsgs();
    }
  }, [id]);
  const addMsgToList = (post) => {
    setMsgs(() => [...msgs, post]);
  };
  const scrollToNewMsg = () => {
    const newMsg = document.getElementById("msgs");
    newMsg.scrollIntoView(true);
  };
  if (redirectToHome === true) {
    return <Redirect to="/" />;
  }
  return (
  // display board msgs
    <div className="board">
      {
        boardLoaded ? (
          <div>
            <Board titleOfPage={true} clickable={false} board={board} />

            <div className="content">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={Math.ceil(msgs.length / PER_PAGE)}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
              <MsgList msgs={visibleMsgs} />
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={Math.ceil(msgs.length / PER_PAGE)}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
              />
              <div className="aside">
                <button className="create-new-post" onClick={scrollToNewMsg}>
                  New Message
                </button>
              </div>
            </div>

            <br />
            <NewMsg
              id="msgs"
              success={addMsgToList}
              boardId={board.id}
            />
          </div>
        ) : (
          <Loader
            type="Puff"
            color="#4f5d75;"
            height={100}
            width={100}
            className="loader"
          />
        )
      }
    </div>
  );
};

export default withRouter(BoardPage);
