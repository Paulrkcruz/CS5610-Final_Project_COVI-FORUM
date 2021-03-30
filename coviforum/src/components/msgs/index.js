import React, { useEffect, useState } from "react";
import "./msgs.css";
import {
  convertDate,
  getRandomBackgroundColor,
  convertDateToFromNow,
} from "../../services/helper";
// Define Msg
const Msg = (props) => {
  const [date, setDate] = useState("");
  const [dateUser, setDateUser] = useState("");
  const [color, setColor] = useState({});
  const initialSetup = () => {
    setDate(convertDate(props.msg.created));
    setColor(
      getRandomBackgroundColor(
        props.msg.user[0] ? props.msg.user[0].name : "Unknown Name"
      )
    );
    
    // Define Date for user registration
    setDateUser(
      props.msg.user[0]
        ? convertDateToFromNow(props.msg.user[0].created)
        : "Unknown Name"
    );
  };
  useEffect(initialSetup, []);
  return (
    <div className="msg-container">
      <div className="header">{date}</div>
      <div className="content">
        <div className="left">
          <div className="icon" style={color}>
            {(props.msg.user[0]
              ? props.msg.user[0].name
              : "Unknown Name"
            ).substring(0, 2)}
          </div>
          // Add 'Member Since' - Registration date
          <p>{props.msg.user[0] ? props.msg.user[0].name : "Unknown Name"}</p>
          <p className="date">Member Since: {dateUser}</p>
        </div>
        <div className="right">{props.msg.content}</div>
      </div>
    </div>
  );
};
export default Msg;
