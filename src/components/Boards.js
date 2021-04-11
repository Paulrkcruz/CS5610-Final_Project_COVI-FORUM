import React, { useState, useEffect } from "react";
import BoardsDataService from "../services/BoardsService";

const Boards = props => {
  const initialBoardsState = {
    id: null,
    title: "",
    description: "",
    published: false
  };
  const [currentBoards, setCurrentBoards] = useState(initialBoardsState);
  const [message, setMessage] = useState("");

  const getBoards = id => {
    BoardsDataService.get(id)
      .then(response => {
        setCurrentBoards(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getBoards(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBoards({ ...currentBoards, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentBoards.id,
      title: currentBoards.title,
      description: currentBoards.description,
      published: status
    };

    BoardsDataService.update(currentBoards.id, data)
      .then(response => {
        setCurrentBoards({ ...currentBoards, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateBoards = () => {
    BoardsDataService.update(currentBoards.id, currentBoards)
      .then(response => {
        console.log(response.data);
        setMessage("The boards was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBoards = () => {
    BoardsDataService.remove(currentBoards.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/boards");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBoards ? (
        <div className="edit-form">
          <h4>Most Popular Boards</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentBoards.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentBoards.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentBoards.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentBoards.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteBoards}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBoards}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Displaying Boards</p>
        </div>
      )}
    </div>
  );
};

export default Boards;