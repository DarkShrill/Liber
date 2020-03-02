import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../CSS/mainLayout/header/header.css"
/**
 * User nav component
 */

class UserHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user
    };
  }
  render() {
    return (


      <nav className="navbar navbar-expand-md navbar-light">
        <Link className="navbar-brand" to="/user">
            Benvenuti in Liber
        </Link>
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/user">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutUs">
                Chi siamo
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="nav">
            <li className="nav-item">
            <img
                      src="https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-shadow-circle-512.png"
                      alt="Profile"
                      className="img-prof"
                    />
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/personalArea">
                  Ciao, {String(this.props.user.Nome)}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default UserHeader;
