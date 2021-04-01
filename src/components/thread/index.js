import React, { useEffect, useState } from "react";
import "./thread.css";
import { Link } from "react-router-dom";
import { convertDateToFromNow } from "../../actions/helper";

const Thread = (props) => {
  const [date, setDate] = useState("");

  const initialSetup = () => {
    setDate(convertDateToFromNow(props.thread.created));
  };

  useEffect(initialSetup, [props.thread.created]);

  const htmlContent = (
    <div className="container">
      <div className="content">
        <div className="subject">
          {props.titleOfPage ? (
            <h1>{props.thread.subject}</h1>
          ) : (
            <h2>{props.thread.subject}</h2>
          )}
        </div>
        <div className="date">
          Created by {props.thread.user.name} {date}
        </div>
        <div className="tags">
          Tags:{" "}
          {props.thread.tags &&
          props.thread.tags.length &&
          Array.isArray(props.thread.tags)
            ? props.thread.tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))
            : ""}
        </div>
      </div>
      <div className="comments vertical-centering">
        <p>{props.thread.count - 1} comments</p>
      </div>
    </div>
  );

  if (props.clickable) {
    return (
      <Link
        className="thread"
        to={{
          pathname: "/thread/" + props.thread.id,
          state: { threadId: props.thread.id },
        }}
      >
        {htmlContent}
      </Link>
    );
  } else {
    return <div className="thread">{htmlContent}</div>;
  }
};

export default Thread;
