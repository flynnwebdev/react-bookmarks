import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import bookmarksListReducer from "./bookmarks_list_reducer";

export default combineReducers({
    auth: authReducer,
    bookmarks: bookmarksListReducer
});