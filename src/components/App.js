import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./../styles/App.css";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import BookmarksPage from "./pages/BookmarksPage";
import API from "./api";

export default class App extends Component {
  constructor(props) {
    super(props);
    const token = sessionStorage.getItem("token");
    this.state = { token, bookmarks: [] };

    if (token) {
      API.setAuthHeader(token);
    }

    API.handleTokenExpiry(() => {
      sessionStorage.clear();
      this.setState({ token: null });
    });
  }

  onRegister = token => {
    sessionStorage.setItem("token", token);
    this.setState({ token });
    API.setAuthHeader(token);
  };

  fetchBookmarks = () => {
    API.get("/bookmarks").then(res => this.setState({ bookmarks: res.data }));
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
              render={props =>
                this.state.token ? (
                  <BookmarksPage
                    {...props}
                    bookmarks={this.state.bookmarks}
                    fetchBookmarks={this.fetchBookmarks}
                    updateBookmarks={this.updateBookmarks}
                  />
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
