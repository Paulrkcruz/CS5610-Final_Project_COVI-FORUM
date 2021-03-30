import React, { useState } from "react";
import "./new-board.css";
import { addBoard } from "./board";
import { withRouter, Redirect } from "react-router-dom";
import TagsInput from "react-tagsinput";
// SOURCE-Click Handler: https://reactjs.org/docs/handling-events.html

// Create a new message board
const NewBoard = (props) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(undefined);
  const [boardId, setBoardId] = useState(undefined);
  const [redirect, setRedirect] = useState(false);
// Click handler
// SEE source-this has a bug
  const handleClick = () => {
    if (subject === "" || message === "") {
      setError("All fields must be filled to continue. Please try again.");
      return;
    }
    var payload = {
      subject: subject,
      message: message,
      tags: JSON.stringify(tags),
    };

    addBoard(payload)
      .then((response) => {
        if (response.status === 200) {
          // link to board page
          setBoardId(response.data.id);
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
          pathname: "/board/" + boardId,
          state: { boardId: boardId },
        }}
      />
    );
  }

  return (
    <div className="new-board">
      <h1>Create a New Message Board</h1>

      <div>
        <label htmlFor="subject">Topic: </label>
        <input
          id="subject"
          alt="subject"
          name="subject"
          placeholder="Enter A Board Topic:"
          type="text"
          onChange={(event) => setSubject(event.target.value)}
        ></input>
      </div>

      <div>
        <label htmlFor="message">Message: </label>
        <textarea
          id="message"
          alt="message"
          name="message"
          onChange={(event) => setMessage(event.target.value)}
        ></textarea>
      </div>
      <div>
        <label htmlFor="tags">Tags: </label>
        <TagsInput
          inputProps={{
            "aria-label": "Add a custom tag to the new message board!",
          }}
          id="tags"
          value={tags}
          onChange={setTags}
        />
      </div>

      <button aria-label="Create a New Board" onClick={handleClick}>
        Submit
      </button>

      <div className="error">{error ? error : "ERROR: Board creation failed. Please refresh the webpage."}</div>
    </div>
  );
};

export default withRouter(NewBoard);
