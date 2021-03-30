import React from "react";
import Board from "../board";

function BoardMsgs(props) {
  const boards = props.boards;
  const listItems = boards.map((board) => (
    <Board
      titleOfPage={false}
      clickable={true}
      key={board.id}
      board={board}
    />
  ));
  return <React.Fragment>{listItems}</React.Fragment>;
}

export default BoardMsgs;
