import React, {Component, useEffect, useState} from "react";
import BoardsDataService from "../services/boards.service";
import {Route, Switch} from "react-router-dom";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import BoardsList from "./boards.list";
import AuthService from "../services/auth.service";
const currentUser = AuthService.getCurrentUser();

export default class AddBoards extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveBoards = this.saveBoards.bind(this);
    this.newBoards = this.newBoards.bind(this);

    this.state = {
      username: currentUser.username,
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    };
  }


  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveBoards() {
    const data = {
      username: currentUser.username,
      title: this.state.title,
      description: this.state.description
    };
    BoardsDataService.create(data)
        .then(response => {
          this.setState({
            username: currentUser.username,
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            published: response.data.published,
            submitted: true
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
  }

  newBoards() {
    this.setState({
      username: currentUser.username,
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    });
  }

  render() {
    return (

        <div className="submit-form">
          {this.state.submitted ? (
              <div>
                <h4>Your Story Has Been Posted to The Boards!</h4>
                <br></br>
                <button className="btn btn-success" onClick={this.newBoards}>
                  Post again!
                </button>

                <div className="divider"/>
                <Link to="/boards">
                  <button type="button" className="btn btn-success">
                    Home
                  </button>
                </Link>
              </div>
          ) : (
              <div>
                <h3>New Post</h3>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                      type="text"
                      className="form-control"
                      id="title"
                      required
                      value={this.state.title}
                      onChange={this.onChangeTitle}
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
                      value={this.state.description}
                      onChange={this.onChangeDescription}
                      name="description"
                  />
                  </div>
                <br></br>
                <Link>
                  <button type="button" onClick={this.saveBoards} className="btn btn-success">
                    Submit
                  </button>
                </Link>
                <div className="divider"/>
                <Link to="/boards">
                  <button type="button" className="btn btn-success">
                    Cancel
                  </button>
                </Link>

              </div>

          )}
          <Switch>
            <Route exact path={["/", "/boards"]} component={BoardsList} />
          </Switch>
        </div>
    );
  }
}