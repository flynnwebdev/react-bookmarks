import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./../styles/App.css";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import BookmarksPage from "./pages/BookmarksPage";
import axios from "axios";

export default class App extends Component {
  state = {
    token: sessionStorage.getItem("token"),
    bookmarks: []
  };

  onRegister = token => {
    sessionStorage.setItem("token", token);
    this.setState({ token });
  };

  fetchBookmarks = () => {
    axios
      .get("http://localhost:3001/bookmarks", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") }
      })
      .then(res => this.setState({ bookmarks: res.data }));
  };

  updateBookmarks = bookmarks => {
      this.setState({ bookmarks });
  };

  render() {
    const { token } = this.state;

    return (
      <BrowserRouter>
        <div>
          {token && <h4>User is logged in!</h4>}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              exact
              path="/register"
              render={props => {
                return <RegisterPage {...props} onRegister={this.onRegister} />;
              }}
            />
            <Route
              exact
              path="/bookmarks"
              render={props => (
                <BookmarksPage
                  {...props}
                  bookmarks={this.state.bookmarks}
                  fetchBookmarks={this.fetchBookmarks}
                  updateBookmarks={this.updateBookmarks}
                />
              )}
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

