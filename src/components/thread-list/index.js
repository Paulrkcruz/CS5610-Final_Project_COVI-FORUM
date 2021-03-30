import React from "react";
import Thread from "../../models/thread";

function ThreadList(props) {
  const threads = props.threads;
  const listItems = threads.map((thread) => (
    <Thread
      titleOfPage={false}
      clickable={true}
      key={thread.id}
      thread={thread}
    />
  ));
  return <React.Fragment>{listItems}</React.Fragment>;
}

export default ThreadList;
