import React, { Component ,useState} from "react";
import PropTypes from "prop-types";
import IndexNav from "../mainLayout/header/header";
import "../../CSS/library/library.css";
import { Input, Badge} from "reactstrap";
import { DropdownButton,Dropdown,Button } from "react-bootstrap";



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
      tempBook:[]
    };
  }

  componentDidMount() {
    this.props.getBooks();
    this.props.initFilter();

    // this.scrollListener = window.addEventListener("scroll", event => {
    //   this.handleScroll(event);
    // });
  }

  componentWillUpdate(){
    console.log("LIBRARY");
    console.log(this.props.library);

  }

  handleChange = event => {
    this.setState({ filter: event.target.value });
    console.log("------------------ FORCE UPDATE");
    //this.forceUpdate();
  };

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

  // handleScroll = () => {
  //   const { scrolling, totalPages, page } = this.props;
  //   if (scrolling) return;
  //   if (totalPages <= page) return;
  //   const lastTr = document.querySelector("tr.book > td:last-child");
  //   const lastTrOffset = lastTr.offsetTop + lastTr.clientHeight;
  //   const pageOffset = window.pageYOffset + window.innerHeight;
  //   var bottomOffset = 20;
  //   if (pageOffset > lastTrOffset - bottomOffset) this.props.loadMore();
  // };
  render() {
    

    return (
      <React.Fragment>
        <IndexNav />
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <hr />
                <h1>Book Library</h1>
                <hr />
              </div>
              <div className="row">
                <div className="filter-genere" >
                  <DropdownButton title="Filtro per Genere" className="m-b m-t" id="dropdown-organization">
                      {this.props.filterGenere.map((organization, i) =>
                      <Dropdown.Item key={i}onClick={() => this.genereFilterClicked(organization)}>{organization}</Dropdown.Item>)}
                  </DropdownButton>
                </div>
                <div className="filter-autore">
                  <DropdownButton title="Filtro per Autore" className="m-b m-t" id="dropdown-organization">
                      {this.props.filterAutore.map((organization, i) =>
                      <Dropdown.Item key={i}onClick={() => this.autoreFilterClicked(organization)}>{organization}</Dropdown.Item>)}
                  </DropdownButton>
                </div>
                <div className="filter-casa-editrice">
                  <DropdownButton title="Filtro per Casa Editrice" className="m-b m-t" id="dropdown-organization">
                      {this.props.filterCasaEditrice.map((organization, i) =>
                      <Dropdown.Item key={i} onClick={() => this.casaEditriceFilterClicked(organization)}>{organization}</Dropdown.Item>)}
                  </DropdownButton>
                </div>
                <div className="reset-filter">
                  <Button variant="warning" onClick={this.resetFilter}>Reset Filter</Button>
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
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>ISBN</th>
                        <th>Titolo</th>
                        <th>Autore</th>
                        <th>Trama</th>
                        <th>Numero Pagine</th>
                        <th>Prezzo</th>
                        <th>Casa editrice</th>
                        <th>Anno</th>
                        <th>Genere</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.filter !== "Cerca per titolo..." && this.state.filter !== "" && (this.state.filterCasaEditrice === "" || this.state.filterAutore  === "" || this.state.filterGenere === "")? (
                          this.props.library.filter((tile) => tile.Titolo.toLowerCase().includes(this.state.filter.toLowerCase())).map(book => (
                          
                              
                                <tr key={book.IBSN} className="book">
                                <td>{book.ISBN}</td>
                                <td>{book.Titolo}</td>
                                <td>{book.Autore}</td>
                                <td>{book.Trama}</td>
                                <td>{book.NumeroPagine}</td>
                                <td>{book.Prezzo + " €"}</td>
                                <td>{book.CasaEditrice}</td>
                                <td>{book.Anno}</td>
                                <td>{book.Genere}</td>
                              </tr>
                              
                          )
                          )):(
                            this.state.filterCasaEditrice === "" && this.state.filterAutore === "" && this.state.filterGenere === "" ? (
                              this.props.library.map(book => (
                              <tr key={book.IBSN} className="book">
                                <td>{book.ISBN}</td>
                                <td>{book.Titolo}</td>
                                <td>{book.Autore}</td>
                                <td>{book.Trama}</td>
                                <td>{book.NumeroPagine}</td>
                                <td>{book.Prezzo + " €"}</td>
                                <td>{book.CasaEditrice}</td>
                                <td>{book.Anno}</td>
                                <td>{book.Genere}</td>
                              </tr>
                      ))):(
                        
                          this.state.filterAutore !== "" ? (
                            this.props.library.filter((tile) => tile.Autore.toLowerCase().includes(this.state.filterAutore.toLowerCase())).map(book => (
                                this.state.tempBook.push(book),
                                this.state.tempBook.map(book => (
                                  <tr key={book.IBSN} className="book">
                                    <td>{book.ISBN}</td>
                                    <td>{book.Titolo}</td>
                                    <td>{book.Autore}</td>
                                    <td>{book.Trama}</td>
                                    <td>{book.NumeroPagine}</td>
                                    <td>{book.Prezzo + " €"}</td>
                                    <td>{book.CasaEditrice}</td>
                                    <td>{book.Anno}</td>
                                    <td>{book.Genere}</td>
                                  </tr>))
                              ))):(
                          this.state.filterGenere !== "" ? (
                            this.props.library.filter((tile) => tile.Genere.toLowerCase().includes(this.state.filterGenere.toLowerCase())).map(book => (
                                this.state.tempBook.push(book),
                                this.state.tempBook.map(book => (
                                  <tr key={book.IBSN} className="book">
                                    <td>{book.ISBN}</td>
                                    <td>{book.Titolo}</td>
                                    <td>{book.Autore}</td>
                                    <td>{book.Trama}</td>
                                    <td>{book.NumeroPagine}</td>
                                    <td>{book.Prezzo + " €"}</td>
                                    <td>{book.CasaEditrice}</td>
                                    <td>{book.Anno}</td>
                                    <td>{book.Genere}</td>
                                  </tr>))
                              ))):(
                          this.state.filterCasaEditrice !== "" ? (
                            this.props.library.filter((tile) => tile.CasaEditrice.toLowerCase().includes(this.state.filterCasaEditrice.toLowerCase())).map(book => (
                                this.state.tempBook.push(book),
                                this.state.tempBook.map(book => (
                                  <tr key={book.IBSN} className="book">
                                    <td>{book.ISBN}</td>
                                    <td>{book.Titolo}</td>
                                    <td>{book.Autore}</td>
                                    <td>{book.Trama}</td>
                                    <td>{book.NumeroPagine}</td>
                                    <td>{book.Prezzo + " €"}</td>
                                    <td>{book.CasaEditrice}</td>
                                    <td>{book.Anno}</td>
                                    <td>{book.Genere}</td>
                                  </tr>))
                              ))):(console.log()))))
                        
                      )}
                    </tbody>
                  </table>
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