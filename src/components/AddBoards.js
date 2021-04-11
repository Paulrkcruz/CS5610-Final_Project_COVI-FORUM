import React, { useState } from "react";
import BoardsDataService from "../services/BoardsService";

const AddBoards = () => {
  const initialBoardsState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [boards, setBoards] = useState(initialBoardsState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBoards({ ...boards, [name]: value });
  };

  const saveBoards = () => {
    var data = {
      title: boards.title,
      description: boards.description
    };

    BoardsDataService.createBoards(data)
      .then(response => {
        setBoards({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBoards = () => {
    setBoards(initialBoardsState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      <h3>New Boards Post</h3>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBoards}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={boards.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Your Story</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={boards.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <button onClick={saveBoards} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBoards;