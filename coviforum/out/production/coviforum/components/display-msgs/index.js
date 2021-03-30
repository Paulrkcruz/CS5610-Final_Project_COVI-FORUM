import React from "react";
import Post from "../display-msgs";
// Msg lists on Boards
// Allows user to see msgs
function DisplayMsgs(props) {
  const msgs = props.msgs;
  const listItems = msgs.map((post, index) => (
    <Post key={index} post={post} />
  ));
  return <div className="display-msgs">{listItems}</div>;
}
export default DisplayMsgs;