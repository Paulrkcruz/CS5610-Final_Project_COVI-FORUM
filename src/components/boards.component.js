import React, { Component } from "react";
import BoardsDataService from "../services/boards.service";

export default class Boards extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getBoards = this.getBoards.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateBoards = this.updateBoards.bind(this);
    this.deleteBoards = this.deleteBoards.bind(this);

    this.state = {
      currentBoards: {
        username: "",
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getBoards(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBoards: {
          ...prevState.currentBoards,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentBoards: {
        ...prevState.currentBoards,
        description: description
      }
    }));
  }

  getBoards(id) {
    BoardsDataService.get(id)
      .then(response => {
        this.setState({
          currentBoards: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    const data = {
      username: this.state.currentBoards.username,
      id: this.state.currentBoards.id,
      title: this.state.currentBoards.title,
      description: this.state.currentBoards.description,
      published: status
    };

    BoardsDataService.update(this.state.currentBoards.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentBoards: {
            ...prevState.currentBoards,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateBoards() {
    BoardsDataService.update(
        this.state.currentBoards.username,
      this.state.currentBoards.id,
      this.state.currentBoards
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Your story was updated!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBoards() {    
    BoardsDataService.delete(this.state.currentBoards.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/boards')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentBoards } = this.state;

    return (
      <div>
        {currentBoards ? (
          <div className="edit-form">
            <h4>Edit Your Story</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentBoards.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentBoards.description}
                  onChange={this.onChangeDescription}
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
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-primary mr-2"
              onClick={this.deleteBoards}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateBoards}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
          </div>
        )}
      </div>
    );
  }
}