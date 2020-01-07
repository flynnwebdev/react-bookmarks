import React, { Component } from "react";
import RegisterForm from "./../forms/RegisterForm";

class RegisterPage extends Component {
    render() {
        //console.log(this.props);
        
        return(
            <div>
                <h1>Register a new user</h1>
                <RegisterForm onRegister={this.props.onRegister} />
            </div>
        );
    }
}

export default RegisterPage;