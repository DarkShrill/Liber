import React, { Component } from "react";
import "../../CSS/home/home.css";
import UserNav from "../mainLayout/header/userHeader";

/**
 * Applicationshome page component
 */

class Index extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //   user: {}
        // };
      }
      componentDidMount() {
        //this.props.getUser();
        this.setState(() => ({
          user: this.props._merda
        }));
      }


  render() {
    return (
      <React.Fragment>
        <UserNav />
        <div className="header">
          <div className="bg-overlay">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="jumbotron">
                    <h1 className="display-4">Welcome to Book Reader</h1>
                    <h1 className="display-4">{String(this.props._merda)}</h1>
                    <p className="lead">
                      A library application that allows you to find and buy
                      your favorite books. We are here to help.
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

export default Index;