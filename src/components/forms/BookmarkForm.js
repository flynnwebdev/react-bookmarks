import React, { Component } from "react";
import API from "../api";

export default class BookmarkForm extends Component {
  state = {
    title: "",
    url: ""
  };

  onTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  onURLChange = event => {
    this.setState({ url: event.target.value });
  };

  onFormSubmit = event => {
    const { title, url } = this.state;
    event.preventDefault();
    API
      .post(
        "/bookmarks",
        { title, url }
      )
      .then(res => this.props.updateBookmarks(res.data));
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <p>
          <label>Title</label>
          <input
            type="text"
            value={this.state.title}
            onChange={this.onTitleChange}
          />
        </p>
        <p>
          <label>URL</label>
          <input
            type="text"
            value={this.state.url}
            onChange={this.onURLChange}
          />
        </p>
        <p>
          <button>Create New Bookmark</button>
        </p>
      </form>
    );
  }
}
