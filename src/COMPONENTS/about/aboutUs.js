import React, { Component } from "react";
import "../../CSS/about/aboutUs.css";
import IndexNav from "../mainLayout/header/header";

/**
 * Applicationshome page component
 */

class About extends Component {
  render() {
    return (
      <React.Fragment>
        <IndexNav />
        <div className="header">
          <div className="bg-overlay">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="jumbotron">
                    <h1 className="display-4">Hi to everyone</h1>
                    <hr className="my-4" />
                    <p></p>
                    <p className="lead">
                      We are two students that's made this BookStore for 
                            <strong>Programming Web Mobile Application's</strong> exam.

                        We hangs out Computer Science to UNICAM from Camerino.
                    </p>
                    <hr className="my-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default About;