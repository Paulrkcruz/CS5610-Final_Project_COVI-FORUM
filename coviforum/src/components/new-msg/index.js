import React, { useState, useEffect } from "react";
import { addMsg } from "../../board";
import { currentUser } from "../../services/user.service";
import { Link, withRouter } from "react-router-dom";
import "./new-msg.css";
// New Msg for Message Board
const NewMsg = (props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(undefined);
  const [boardId, setThreadId] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [needToLogin, setNeedToLogin] = useState(false);
// Setup
  const initialSetup = () => {
    setThreadId(props.boardId);
    if (!currentUser.id) {
      setNeedToLogin(true);
    }
  };
  useEffect(initialSetup, []);
  const handleClick = () => {
    var payload = {
      boardId: boardId,
      message: message,
      location: JSON.stringify(location),
    };
//  Msg
    addMsg(payload)
      .then((response) => {
        if (response.status === 200) {
          // link to board page
          const data = response.data;
          // convert to msg object
          const msg = {
            active: data.active,
            content: data.content,
            created: data.created,
            user: [
              {
                name: currentUser.name,
                id: currentUser.id,
              },
            ],
          };
          props.success(msg);
          setMessage("Location Shared!");
          setLocation(undefined);
        } else if (response.status === 202) {
          setError(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const askLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    } else {
      setError("This browser does not support Geolocation sharing.");
    }
  };

  if (needToLogin) {
    return (
      <div id={props.id} className="new-msg">
        Please sign-in/sign-up to add a msg.
        <Link
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        >
          <p className="button">Navigate to sign-in/sign-up</p>
        </Link>
      </div>
    );
  } else {
    return (
      <div id={props.id} className="new-msg">
        <h2>Add Message:</h2>
        <textarea
          id="message"
          alt="message"
          name="message"
          aria-label="New Message"
          onChange={(event) => setMessage(event.target.value)}
        ></textarea>
        <div className="location">
          <label htmlFor="location">Share location: </label>
          <input
            aria-label="Enable Location Sharing"
            onChange={askLocation}
            type="checkbox"
          ></input>
        </div>
        <button aria-label="Add Message to Board" onClick={handleClick}>
          Submit
        </button>
        <div>{error ? error : ""}</div>
      </div>
    );
  }
};

export default withRouter(NewMsg);
