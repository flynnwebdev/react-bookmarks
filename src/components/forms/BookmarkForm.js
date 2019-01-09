import React, {Component} from "react";
import { connect } from "react-redux";
import { createBookmark } from "./../../actions";

class BookmarkForm extends Component {
    state = { title: "", url: ""}
    
    onFormSubmit = async (event) => {
        event.preventDefault();
        const { title, url } = this.state;
        const { createBookmark } = this.props;

        createBookmark({ title, url });
    }

    onInputChange = (name, event) => {
        this.setState({ [name]: event.target.value });
    }

    render() {
        const { title, url } = this.state;

        return (
            <form onSubmit={this.onFormSubmit}>
                <p>
                    <label htmlFor="title">Title</label>
                    <input type="text" value={title} onChange={(event) => this.onInputChange("title", event)} />
                </p>
                <p>
                    <label htmlFor="url">Url</label>
                    <input type="text" value={url} onChange={(event) => this.onInputChange("url", event)} />
                </p>
                <p>
                    <input type="submit" value="Create New Bookmark" />
                </p>
            </form>
        );
    }
}

export default connect(null, {
    createBookmark
})(BookmarkForm);