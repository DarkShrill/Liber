import React, { Component } from "react";
import "../../CSS/about/aboutUs.css";
import IndexNav from "../mainLayout/header/header";
import IndexNavLogged from  "../mainLayout/header/loggedHeader";

/**
 * Applicationshome page component
 */

class AboutUs extends Component {
  constructor(props){
    super(props);

    console.log(this.props);
  }

  render() {
    return (
      <React.Fragment>
        {this.props.token !== false ? <IndexNavLogged user={this.props.user} /> : <IndexNav />}
        <div className="header">
          <div className="bg-overlay">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="jumbotron">
                    <h1 className="display-4">{this.props.user.Nome !== undefined ? "Ciao, " + String(this.props.user.Nome) : "Ciao a tutti"}</h1>
                    <hr className="my-4" />
                    <p></p>
                    <p className="lead">
                       Siamo due studenti dell'università di Informatica di Camrino.<br/>
                       Abbiamo realizzato quest'applicazione per il corso di
                            <strong> Progettazione di Applicazioni Web e Mobili</strong>.
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

export default AboutUs;