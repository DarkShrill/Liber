import React, { Component } from "react";
import "../../CSS/home/home.css";
import UserNav from "../mainLayout/header/userHeader";

/**
 * Applicationshome page component
 */

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user_name: {}
        };
        console.log("UTENTE : ");
        console.log(this.props.user);
      }
      componentDidMount() {
        this.props.getUser();
        console.log(this.props.user);
        this.setState(() => ({
          user: this.props.user,
          user_name: this.props.user.name
        }));
        //this.forceUpdate();
        
      }

      componentWillUpdate(){
        console.log("AAAAA");
        console.log(this.state.user)
        console.log(this.state.user_name)
        console.log(this.props.user)
        console.log("NAME");
        console.log(String(this.props.user.name))
      }


  render() {
    return (
      <React.Fragment>
        <UserNav 
          user={this.props.user}/>
        <div className="header">
          <div className="bg-overlay">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="jumbotron">
                    <h1 className="display-4">Hi <strong>{String(this.state.user_name)}</strong> ,Welcome to Book Reader</h1>
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