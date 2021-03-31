import React, { useState } from "react";
import "./new-thread.css";
import { addThread } from "../thread";
import { withRouter, Redirect } from "react-router-dom";
// import TagsInput from "react-tagsinput";
// Create a new Board Thread
// Posts
const NewThread = (props) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(undefined);
  const [threadId, setThreadId] = useState(undefined);
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    if (subject === "" || message === "") {
      setError("All fields must be filled.");
      return;
    }

    var payload = {
      subject: subject,
      message: message,
      tags: JSON.stringify(tags),
    };

    addThread(payload)
      .then((response) => {
        if (response.status === 200) {
          // link to thread page
          setThreadId(response.data.id);
          setRedirect(true);
        } else if (response.status === 202) {
          setError(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (redirect === true) {
    return (
      <Redirect
        to={{
          pathname: "/thread/" + threadId,
          state: { threadId: threadId },
        }}
      />
    );
  }

  return (
    <div className="new-thread">
      <h1>Add a thread</h1>

      <div>
        <label htmlFor="subject">Subject: </label>
        <input
    id="subject"
    alt="subject"
    name="subject"
    placeholder="Enter thread subject"
    type="text"
    onChange={(event) => setSubject(event.target.value)}
    />
      </div>

      <div>
        <label htmlFor="message">Message: </label>
        <textarea
    id="message"
    alt="message"
    name="message"
    onChange={(event) => setMessage(event.target.value)}
    />
      </div>
      <div>
        <label htmlFor="tags">Tags: </label>
        {/*<TagsInput*/}
        {/*  inputProps={{*/}
        {/*    "aria-label": "Add Tags",*/}
        {/*  }}*/}
        {/*  id="tags"*/}
        {/*  value={tags}*/}
        {/*  onChange={setTags}*/}
        {/*/>*/}
      </div>

      <button aria-label="Create a New Thread Board" onClick={handleClick}>
        Submit
      </button>

      <div className="ERROR">{error ? error : ""}</div>
    </div>
  );
};

export default withRouter(NewThread);
