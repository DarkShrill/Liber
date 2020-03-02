import React, { Component } from "react";
import PropTypes from "prop-types";
import IndexNav from "../mainLayout/header/header";
import "../../CSS/library/library.css";
import { Input} from "reactstrap";
import { DropdownButton,Dropdown,Button } from "react-bootstrap";
import { Redirect} from "react-router-dom";

/**
 * Library component
 * Displays all books before user log in
 */

// Stateless Component: Has no state and operates with props only. Easy to follow and test

class Library extends Component  {

  constructor(props){
    super(props);
    this.state = {
      filter:"Cerca per titolo...",
      filterCasaEditrice:"",
      filterAutore:"",
      filterGenere:"",
      tempBook: props.tempBook
    };
  }

  componentDidMount() {
    this.props.getBooks();
    this.props.initFilter();
  }

  handleSubmit = () => {
    this.props.history.push("/login");
  }

  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  casaEditriceFilterClicked = data => {
    this.resetFilter();
    this.setState({filterCasaEditrice: data})
  }

  genereFilterClicked = data => {
    this.resetFilter();
    this.setState({filterGenere: data})
  }

  autoreFilterClicked = data => {
    this.resetFilter();
    this.setState({filterAutore: data})
  }

  resetFilter = () => {
    this.setState({      filter:"Cerca per titolo...",
    filterCasaEditrice:"",
    filterAutore:"",
    filterGenere:"",
    tempBook:false
  });
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

    if(this.props.token !== false) {
      return <Redirect to="/userLibrary" />;
    }

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

    return (
      <React.Fragment>
        <IndexNav />
        <div className="container loginResponsive">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <hr />
                <h1>Negozio</h1>
                <hr />
              </div>
              <div className="row">
                <div className="filter-genere" >
                  <DropdownButton title="Filtra per Genere" className="m-b m-t" id="dropdown-organization">
                      {this.props.filterGenere.map((organization, i) =>
                      <Dropdown.Item key={i}onClick={() => this.genereFilterClicked(organization)}>{organization}</Dropdown.Item>)}
                  </DropdownButton>
                </div>
                <div className="filter-autore">
                  <DropdownButton title="Filtra per Autore" className="m-b m-t" id="dropdown-organization">
                      {this.props.filterAutore.map((organization, i) =>
                      <Dropdown.Item key={i}onClick={() => this.autoreFilterClicked(organization)}>{organization}</Dropdown.Item>)}
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
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Library.propTypes = {
  library: PropTypes.array.isRequired,
  loading: PropTypes.bool
};

export default Library;