import React, { Component } from "react";
import swal from "sweetalert";
import "../../CSS/library/bookDetail.css";
import { Button } from "react-bootstrap";


class BookDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
          user: this.props.user,
          tempBook: this.props.tempBook,
          needsCreditCard: false
        };

        if(this.state.needsCreditCard) {
          this.props.history.push("/creditCard");
        }

        console.log(this.state.tempBook);
        if(this.state.tempBook === false) {
          this.props.history.push("/library");
        }
      }
      componentDidMount() {
        this.setState(() => ({
          user: this.props.user
        }));
      }

    buyButtonHandler = ISBN => {
      var _self = this;
      if(this.props.user.NumeroCarta === null) {
        this.setState({
          needsCreditCard: true
        });
        swal("Nessuna carta di credito collegata a questo account", { buttons: false, timer: 2500 }).then(function() {
          _self.props.history.push("/creditCard");
        });
      } else {
        swal("Sei sicuro di voler confermare l'acquisto?", { buttons: {cancel: "No", buy: "Sì"}}).then(function(value) {
          if(value === "buy") {
            _self.props.buyLib({ISBN});
          }
        });
      }
    }

    goBack = () => {
      this.props.history.push("/library");
    }
       
    render() {
      return (
        <React.Fragment>
            <div className="text-center">
              <hr />
              <h1>Informazioni</h1>
              <button type="button" onClick={() => {this.goBack()}} className="btn btn-warning">Indietro</button>
              <hr />
            </div>
            <div className="book_cover"></div>
            <div className="leftDiv">
              <div className="book_info"><span className="info-headers">Titolo: </span>{this.state.tempBook.Titolo}</div>
              <div className="book_info"><span className="info-headers">Autore: </span>{this.state.tempBook.Autore}</div>
              <div className="book_info"><span className="info-headers">Casa Editrice: </span>{this.state.tempBook.CasaEditrice}</div>
              <div className="book_info"><span className="info-headers">Anno di pubblicazione: </span>{this.state.tempBook.AnnoPubblicazione}</div>
              <div className="book_info"><span className="info-headers">Pagine: </span>{this.state.tempBook.NumeroPagine}</div>
              <div className="book_info"><span className="info-headers">ISBN: </span>{this.state.tempBook.ISBN}</div>
              <div className="book_info"><span className="info-headers">Prezzo: </span>{Number(this.state.tempBook.Prezzo).toFixed(2) + " €"}</div>
              <Button className="buy_button" variant="success">Acquista</Button>
            </div>
            <div className="book_plot"><span className="info-headers">Trama: </span><br/>{this.state.tempBook.Trama}</div>
        </React.Fragment>
      );
    }
  }
  
  export default BookDetail;