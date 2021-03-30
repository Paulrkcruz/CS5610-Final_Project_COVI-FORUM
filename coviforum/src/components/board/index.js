import React, { useEffect, useState } from "react";
import "./board.css";
import { Link } from "react-router-dom";
import { convertDateToFromNow } from "../../service/helper";
// Board
// Defines a message board
const Board = (props) => {
  const [date, setDate] = useState("");
// Setup variables
  const initialSetup = () => {
    setDate(convertDateToFromNow(props.board.created));
  };
  useEffect(initialSetup, []);
// Define HTML content
  const htmlContent = (
    <div className="container">
      <div className="content">
        <div className="subject">
          {props.titleOfPage ? (
            <h1>{props.board.subject}</h1>
          ) : (
            <h2>{props.board.subject}</h2>
          )}
        </div>
        <div className="date">
          Created by {props.board.user.name} {date}
        </div>
        <div className="tags">
          Tags:{" "}
          {props.board.tags &&
          props.board.tags.length &&
          Array.isArray(props.board.tags)
            ? props.board.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))
            : ""}
        </div>
      </div>
      <div className="comments vertical-centering">
        <p>{props.board.count - 1} comments</p>
      </div>
    </div>
  );
  if (props.clickable) {
    return (
      <Link
        className="board"
        to={{
          pathname: "/board/" + props.board.id,
          state: { boardId: props.board.id },
        }}
      >
        {htmlContent}
      </Link>
    );
  } else {
    return <div className="board">{htmlContent}</div>;
  }
};

export default Board;
