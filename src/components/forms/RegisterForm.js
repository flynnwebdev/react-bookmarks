import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { setAuthToken } from "./../../actions";
import { connect } from "react-redux";

class RegisterForm extends Component {
  state = {
    email: "",
    password: ""
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    axios
      .post("http://localhost:3001/auth/register", { email, password })
        .then(res => { this.props.onRegister(res.data.token); this.props.history.push("/") })
      .catch(err => console.error(err));

    // fetch("http://localhost:3001/auth/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({ email, password })
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(err => console.error(err));
  };

  onInputChange = (name, event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    console.log(this.props);
    const { email, password } = this.state;

    return (
      <form onSubmit={this.onFormSubmit}>
        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={event => this.onInputChange("email", event)}
          />
        </p>
        <p>
          <label htmlFor="email">Password</label>
          <input
            type="password"
            value={password}
            onChange={event => this.onInputChange("password", event)}
          />
        </p>
        <p>
          <input type="submit" value="Register New User" />
        </p>
      </form>
    );
  }
}

export default connect(null, {
  setAuthToken
})(withRouter(RegisterForm));
