import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./../styles/App.css";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

class App extends Component {
    state = { token: sessionStorage.getItem("token") }

    onRegisterFormSubmit = (token, cb) => {
        sessionStorage.setItem("token", token);
        this.setState({ token }, cb);
    }
    
    render() {
        const { token } = this.state;

        return (
            <BrowserRouter>
                <div>
                    { token && <h4>User is logged in!</h4>}
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/register" render={(props) => {
                            return <RegisterPage {...props} onRegisterFormSubmit={this.onRegisterFormSubmit}  />
                        }} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
