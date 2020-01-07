import React, {Component} from "react";
import BookmarkForm from "./../forms/BookmarkForm";

export default class BookmarksPage extends Component {
    componentDidMount() {
        const { fetchBookmarks } = this.props;
        fetchBookmarks();
    }
    
    render() {
        const { bookmarks } = this.props;

        return (
            <div>
                <h2>New Bookmark</h2>
                <BookmarkForm updateBookmarks={this.props.updateBookmarks} />
                <h2>My Bookmarks</h2>
                <ul>
                    {bookmarks.map(bookmark => {
                        return (
                            <li key={bookmark._id}>
                                <a href={bookmark.url}>{bookmark.title}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}
