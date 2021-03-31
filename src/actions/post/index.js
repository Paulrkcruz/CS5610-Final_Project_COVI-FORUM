import React, { useEffect, useState } from "react";
// SOURCE: https://medium.com/@samwsoftware/building-a-forum-with-react-and-node-242a2a3c2995

import {
  convertDate,
  getRandomBackgroundColor,
  convertDateToFromNow,
} from "../helper";

const Post = (props) => {
  const [date, setDate] = useState("");
  const [dateUser, setDateUser] = useState("");
  const [color, setColor] = useState({});

  const initialSetup = () => {
    setDate(convertDate(props.post.created));
    setColor(
      getRandomBackgroundColor(
        props.post.user[0] ? props.post.user[0].name : "unknown"
      )
    );
    setDateUser(
      props.post.user[0]
        ? convertDateToFromNow(props.post.user[0].created)
        : "unknown"
    );
  };

  useEffect(initialSetup, []);

  return (
    <div className="post-container">
      <div className="header">{date}</div>
      <div className="content">
        <div className="left">
          <div className="icon" style={color}>
            {(props.post.user[0]
              ? props.post.user[0].name
              : "unknown"
            ).substring(0, 2)}
          </div>
          <p>{props.post.user[0] ? props.post.user[0].name : "unknown"}</p>
          <p className="date">Joined: {dateUser}</p>
        </div>
        <div className="right">{props.post.content}</div>
      </div>
    </div>
  );
};

export default Post;
