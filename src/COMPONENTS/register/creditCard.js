import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import IndexNav from "../mainLayout/header/header";
import "../../CSS/register/creditCard.css";
/**
 * Login component
 */

class CreditCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber : ""
    };

    if(this.props.user.NumeroCarta) {
        this.props.history.push("/userLibrary");
    }

  }
  handleSubmit = event => {
    /**
     * Handles form submission
     */
    event.preventDefault();
    this.props.toggleLoading();

    var data = {
        token: this.props.token,
        ID: this.props.user.ID,
        NumeroCarta: this.state.cardNumber
    }

    this.props.addCard(data);
  };

  handleChange = event => {

    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {

    if(this.props.user.NumeroCarta != null) {
        return <Redirect to="/userLibrary" />  
    }

    return !this.props.token  ? (
      <Redirect to="/library" />
    ) : (
      <React.Fragment>
        <IndexNav />
        <div className="container">
          <div className="row">
            <div className="col-md-6 login-left text-center">
              <h1>Benvenuti in Liber!</h1>
              <p>Siamo lieti di avervi con noi</p>
            </div>
            <div className="col-md-6">
              <div className="login-form">
                <legend id="legend-id">Aggiungi una carta al tuo account</legend>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="Email">Numero di Carta</label>
                    <br />
                    <input
                      type="text"
                      className="form-control"
                      id="Email"
                      aria-describedby="emailHelp"
                      placeholder="Enter credit card number"
                      onChange={this.handleChange}
                      name="cardNumber"
                      required={true}
                    />
                  </div>
                  <div>
                    {this.props.loading ? (
                      this.props.loader
                    ) : (
                      <button type="submit" className="btn btn-primary">
                        Aggiungi Carta
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreditCard;
