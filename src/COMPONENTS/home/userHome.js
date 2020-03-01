import React, { Component } from "react";
import "../../CSS/home/home.css";
import { Redirect } from "react-router-dom";

/**
 * Applicationshome page component
 */

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user_name: {}
        };

        if(!this.props.token) {
          this.props.history.push("/library");
        }
      }
      componentDidMount() {
        this.setState(() => ({
          user: this.props.user,
          user_name: this.props.user.Nome
        }));
      }

  render() {
    return (
      <Redirect to="/userLibrary" />
      /*
      <React.Fragment>
        <UserNav 
          user={this.props.user}/>
        <div className="header">
          <div className="bg-overlay">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="jumbotron">
                    <h1 className="display-4">Hi <strong>{String(this.state.user_name)}</strong> ,Benvenuti in Liber</h1>
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
      */
    );
  }
}

export default Index;