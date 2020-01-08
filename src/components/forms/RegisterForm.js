import React, { Component } from "react";
import API from "../api";
import { Redirect } from "react-router-dom";

export default class RegisterForm extends Component {
  state = {
    email: "",
    password: "",
    submit: false
  };

  onFormSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    API.post("/auth/register", { email, password })
      .then(res => {
        this.props.onRegister(res.data.token);
        this.setState({ submit: true });
      })
      .catch(err => console.error(err));
  };

  onInputChange = (name, event) => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { email, password } = this.state;

    return this.state.submit ? (
      <Redirect to="/" />
    ) : (
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
