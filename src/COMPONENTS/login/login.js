import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import IndexNav from "../mainLayout/header/header";
import "../../CSS/login/login.css";
/**
 * Login component
 */

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      password: ""
    };
  }
  handleSubmit = event => {
    /**
     * Handles form submission
     */
    event.preventDefault();
    this.props.toggleLoading();
    this.props.logIn(this.state);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return this.props.loggedIn  ? (
      <Redirect to="/user" />
    ) : (
      <React.Fragment>
        <IndexNav />
        <div className="container">
          <div className="row">
            <div className="col-md-6 login-left text-center">
              <h1>WELCOME TO THE READER</h1>
              <p>We are happy to have you here</p>
            </div>
            <div className="col-md-6">
              <div className="login-form">
                <legend id="legend-id">Login</legend>
                <form onSubmit={this.handleSubmit}>
                  {this.props.loginErrors.Message ? (
                    <div className="error">
                      {this.props.loginErrors.Message}
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="form-group">
                    <label htmlFor="Email">Email</label>
                    <br />
                    <span className="error">
                      {this.props.loginErrors.Email
                        ? this.props.loginErrors.Email
                        : ""}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="Email"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      onChange={this.handleChange}
                      name="Email"
                      value={this.state.Email}
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <br />
                    <span className="error">
                      {this.props.loginErrors.password
                        ? this.props.loginErrors.password
                        : ""}
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                      onChange={this.handleChange}
                      name="password"
                      value={this.state.password}
                      required={true}
                    />
                  </div>
                  <div>
                    {this.props.loading ? (
                      this.props.loader
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Login
                      </button>
                    )}
                  </div>
                </form>
                <p className="no-account">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
