import React, { Component } from "react";
import PropTypes from "prop-types";
import swal from "sweetalert";
import IndexNav from "../../COMPONENTS/mainLayout/header/userHeader";
import "../../CSS/library/userLibrary.css";
import { Input } from "reactstrap";
import { DropdownButton,Dropdown,Button } from "react-bootstrap";


class UserLibrary extends Component {

    constructor(props) {
        super(props);
        this.state = {
          user: this.props.user,
          filter:"Cerca per titolo...",
          filterCasaEditrice:"",
          filterAutore:"",
          filterGenere:"",
          tempBook:[],
          suggestedBooks: this.props.suggestedBooks,
          needsCreditCard: false
        };

        console.log("NEEDS CREDIT CARD " + this.state.needsCreditCard);

        if(this.state.needsCreditCard) {
          this.props.history.push("/creditCard");
        }

        if(!this.props.token) {
          console.log("NESSUN TOKEN");
          this.props.history.push("/library");
        }

        console.log("UTENTE PERSONAL AREA user lib: ");
        console.log(this.props.user);
        console.log(this.state.user);


      }
      componentDidMount() {
        this.props.getBooks();
        this.props.initFilter();
        this.setState(() => ({
          user: this.props.user
        }));
      }
  

      casaEditriceFilterClicked = data => {
        this.resetFilter();
        this.setState({filterCasaEditrice: data})
        //this.forceUpdate();
      }
    
      genereFilterClicked = data => {
        this.resetFilter();
        this.setState({filterGenere: data})
        //this.forceUpdate();
      }
    
      autoreFilterClicked = data => {
        this.resetFilter();
        this.setState({filterAutore: data})
        //this.forceUpdate();
      }
    
      resetFilter = () => {
        this.setState({      filter:"Cerca per titolo...",
        filterCasaEditrice:"",
        filterAutore:"",
        filterGenere:"",
        tempBook:[]
      });
        //this.forceUpdate();
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
        swal("Sei sicuro di voler confermare l'acquisto?", {
          buttons: {cancel: "No", buy: "Sì"},
        }).then(function(value) {
          if(value === "buy") {
            _self.props.buyLib({ISBN})
          }
        });
      }
    }

  openBookDetail = id => {
      var _self = this;
      this.props.setDetailBook(this.props.library.filter((tile) => tile.ISBN === id)[0], function() {
        _self.props.history.push("/bookDetail");
      });
    }   

  displayBooks = books => {
    var elements = [];

    for(let i = 0; i < books.length; i++) {
      elements.push(<div key={books[i].ISBN} className="book-element-container">
        <div className="book-cover" onClick={() => {this.openBookDetail(books[i].ISBN)}}></div>
        <div className="base-text">{books[i].Titolo}</div>
        <div className="base-text">{books[i].Autore}</div>
        <div className="base-text">{Number(books[i].Prezzo).toFixed(2) + " €"}</div>
        <Button onClick={() => {this.buyButtonHandler(books[i].ISBN)}} className="buyButton" variant="success">Acquista</Button>
      </div>);
    }

    return elements;
  }

  render() {
    var elements;
    var books;

    if(this.state.filter !== "Cerca per titolo..." && this.state.filter !== "" && (this.state.filterCasaEditrice === "" || this.state.filterAutore  === "" ||
      this.state.filterGenere === "")) {
        books = this.props.library.filter((tile) => tile.Titolo.toLowerCase().includes(this.state.filter.toLowerCase()));
    } else if(this.state.filterCasaEditrice === "" && this.state.filterAutore === "" && this.state.filterGenere === "") {
      books = this.props.library;
    } else if(this.state.filterAutore !== "") {
      books = this.props.library.filter((tile) => tile.Autore.toLowerCase().includes(this.state.filterAutore.toLowerCase()));
    } else if(this.state.filterGenere !== "") {
      books = this.props.library.filter((tile) => tile.Genere.toLowerCase().includes(this.state.filterGenere.toLowerCase()));
    } else if(this.state.filterCasaEditrice !== "") {
      books = this.props.library.filter((tile) => tile.CasaEditrice.toLowerCase().includes(this.state.filterCasaEditrice.toLowerCase()));
    } else {
      console.log("Errore");
    }

    elements = this.displayBooks(books);

    console.log("SUGGETED BOOKS");
    console.log(this.props.suggestedBooks);

      return (
        <React.Fragment>
          <IndexNav 
            user={this.props.user}/>
            <div className="text-center">
            {this.props.loading ? (
            this.props.loader
            ) : (
              this.props.suggestedBooks.length === 0 ? (
                <div>
                  <hr />
                  <h1>Consigliati per te</h1>
                  <hr />
                  <h2>Acquista nel nostro negozio per farci sapere che generi ti piacciono.<br/> Selezioneremo per te i libri che potrebbero interessarti!</h2>
                </div>
                ) : 
                (
                <div>
                <hr />
                <h1>Consigliati per te</h1>
                <button type="button" onClick={() => {this.props.getSuggestedBooks()}} 
                        className="btn btn-warning">Mostra altri</button>
                <hr />
                <div className="book-slider-wrapper">
                  <div className="book-slider">
                      {this.props.suggestedBooks.map(book => (
                      <div className="book-element" key={book.ISBN}>
                        <div className="book-cover-suggested" onClick={() => {this.openBookDetail(book.ISBN)}}></div>
                        <div className="base-text">{book.Titolo}</div>
                        <div className="base-text">{book.Autore}</div>
                        <div className="base-text">{Number(book.Prezzo).toFixed(2) + " €"}</div>
                        <Button onClick={() => {this.buyButtonHandler(book.ISBN)}} className="buyButton" variant="success">Acquista</Button>
                      </div>
                      ))}
                  </div>
                </div>
                </div>
                )
            )}
            </div>
            <div className="container">
              <div className="text-center">
                <hr />
                <h1>Negozio</h1>
                <hr />
              </div>
              <div className="row">
                <div className="filter-genere" >
                  <DropdownButton title="Filtra per Genere" className="m-b m-t" id="dropdown-organization">
                      {this.props.filterGenere.map((organization, i) =>
                      <Dropdown.Item key={i} onClick={() => this.genereFilterClicked(organization)}>{organization}</Dropdown.Item>)}
                  </DropdownButton>
                </div>
                <div className="filter-autore">
                  <DropdownButton title="Filtra per Autore" className="m-b m-t" id="dropdown-organization">
                      {this.props.filterAutore.map((organization, i) =>
                      <Dropdown.Item key={i }onClick={() => this.autoreFilterClicked(organization)}>{organization}</Dropdown.Item>)}
                  </DropdownButton>
                </div>
                <div className="filter-casa-editrice">
                  <DropdownButton title="Filtra per Casa Editrice" className="m-b m-t" id="dropdown-organization">
                      {this.props.filterCasaEditrice.map((organization, i) =>
                      <Dropdown.Item key={i} onClick={() => this.casaEditriceFilterClicked(organization)}>{organization}</Dropdown.Item>)}
                  </DropdownButton>
                </div>
                <div className="reset-filter">
                  <Button variant="warning" onClick={this.resetFilter}>Resetta</Button>
                </div>
                <div className="col-md-4">
                  <Input
                      key="searchTextBox"
                      name="search"
                      type="text"
                      placeholder="Cerca per titolo..."
                      className="search"
                      onChange={event => {this.setState({filter: event.target.value})}}
                      onKeyPress={event => {
                          if (event.key === 'Enter') {
                              this.forceUpdate();
                          }
                      }}
                    />
                </div>
              </div>
              {this.props.loading ? (
                this.props.loader
              ) : (
                  <div className="mainContainer">
                    {elements}
                  </div>
              )}
              {this.props.scrolling ? this.props.loader : ""}
            </div>
        </React.Fragment>
      );
    }
  }
  
  UserLibrary.propTypes = {
    library: PropTypes.array.isRequired,
    loading: PropTypes.bool
  };
  
  export default UserLibrary;