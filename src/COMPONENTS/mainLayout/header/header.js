import React, { Component } from "react";
import { Link } from "react-router-dom";

/**
 * Index nav component
 */

class IndexNav extends Component {
  render() {
    
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <Link className="navbar-brand" to="/">
            Benvenuti in Liber
          </Link>
          <button
            className="navbar-toggler"
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
                <Link className="nav-link" to="/library">
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
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Registrati
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default IndexNav;
