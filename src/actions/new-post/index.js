import React, { useState, useEffect } from "react";
import { addPost } from "../../models/thread";
import { currentUser } from "../../services/user.service";
import { Link, withRouter } from "react-router-dom";
// SOURCE: https://medium.com/@samwsoftware/building-a-forum-with-react-and-node-242a2a3c2995

// Post in Message Boards
const NewPost = (props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(undefined);
  const [threadId, setThreadId] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [needToLogin, setNeedToLogin] = useState(false);

  const initialSetup = () => {
    setThreadId(props.threadId);
    if (!currentUser.id) {
      setNeedToLogin(true);
    }
  };

  useEffect(initialSetup, []);
// Click handler
  const handleClick = () => {
    var payload = {
      threadId: threadId,
      message: message,
      location: JSON.stringify(location),
    };
// Add a Post to Thread Board
    addPost(payload)
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          const post = {
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
          props.success(post);

          // clear data
          setMessage("");
          setLocation(undefined);
        } else if (response.status === 202) {
          setError(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
// Location sharing options
    // SOURCE: https://pusher.com/tutorials/geolocation-sharing-react-native
  const askLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    } else {
      setError("Geolocation is not supported. Try again with Google Chrome.");
    }
  };

  if (needToLogin) {
    return (
      <div id={props.id} className="new-post">
        Please sign-in/sign-up to add a post.
        <Link
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        >
          <p className="button">Go to sign-in/sign-up</p>
        </Link>
      </div>
    );
  } else {
    return (
      <div id={props.id} className="new-post">
        <h2>Add post:</h2>
        <textarea
    id="message"
    alt="message"
    name="message"
    aria-label="New post message"
    onChange={(event) => setMessage(event.target.value)}
    />
        <div className="location">
          <label htmlFor="location">Share location: </label>
          <input
    aria-label="Enable Location Sharing"
    onChange={askLocation}
    type="checkbox"
    />
        </div>
        <button aria-label="Post to Thread Board" onClick={handleClick}>
          Post
        </button>
        <div>{error ? error : ""}</div>
      </div>
    );
  }
};

export default withRouter(NewPost);
