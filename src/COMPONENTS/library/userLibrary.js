import React, { Component } from "react";
import PropTypes from "prop-types";
import swal from "sweetalert";
import IndexNav from "../../COMPONENTS/mainLayout/header/userHeader";
import "../../CSS/library/userLibrary.css";
import { Input, Badge } from "reactstrap";
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
          tempBook:[]
        };
        console.log("UTENTE PERSONAL AREA user lib: ");
        console.log(this.props.user);
        console.log(this.state.user);
      }
      componentDidMount() {
        //this.props.getUser();
        this.props.getBooks();
        //this.props.getOwnBook();
        console.log("PERSONAL AREA");
        this.setState(() => ({
          user: this.props.user
          //ownBook:this.props.ownBook
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
      this.props.user.NumeroCarta === "" ? (
        swal("You don't add a Credit card, please add one", { buttons: false, timer: 2500 })
      ):(
        this.props.buyLib({ISBN})
      )
    }
       
    render() {
      return (
        <React.Fragment>
          <IndexNav 
            user={this.props.user}/>
            <div className="col-lg-12">
                <div className="text-center">
                <hr />
                <h1>Books selected for me</h1>
                <hr />
                </div>
                {this.props.loading ? (
                this.props.loader
                ) : (
                <div className="table-responsive">
                    <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                        <th>Book Title</th>
                        <th>Book Author</th>
                        <th>Book Kind</th>
                        <th>Book Page</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {this.props.borrowedBooks.map(book => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.isbn}</td>
                            <td>{book.borrowDate}</td>
                            <td>{book.dueDate}</td>
                            <td>
                            <Button
                                className="btn btn-success"
                                onClick={event =>
                                this.props.returnBook(event, book.id)
                                }
                            >
                                Return Book
                            </Button>
                            </td>
                        </tr>
                        ))} */}
                    </tbody>
                    </table>
                </div>
                )}
            </div>
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
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.filter !== "Cerca per titolo..." && this.state.filter !== "" && (this.state.filterCasaEditrice === "" || this.state.filterAutore  === "" || this.state.filterGenere === "")? (
                          this.props.library.filter((tile) => tile.Titolo.toLowerCase().includes(this.state.filter.toLowerCase())).map(book => (
                          
                              
                                <tr key={book.ISBN} className="book">
                                <td>{book.ISBN}</td>
                                <td>{book.Titolo}</td>
                                <td>{book.Autore}</td>
                                <td>{book.Trama}</td>
                                <td>{book.NumeroPagine}</td>
                                <td>{book.Prezzo + " €"}</td>
                                <td>{book.CasaEditrice}</td>
                                <td>{book.Anno}</td>
                                <td>{book.Genere}</td>
                                <td className="buy-button" onClick={() => {this.buyButtonHandler(book.ISBN)}}><Button variant="success">Buy</Button></td>
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
                                <td className="buy-button" onClick={() => {this.buyButtonHandler(book.ISBN)}}><Button variant="success">Buy</Button></td>
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
                                    <td className="buy-button" onClick={() => {this.buyButtonHandler(book.ISBN)}}><Button variant="success">Buy</Button></td>
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
                                    <td className="buy-button" onClick={() => {this.buyButtonHandler(book.ISBN)}}><Button variant="success">Buy</Button></td>
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
                                    <td className="buy-button" onClick={() => {this.buyButtonHandler(book.ISBN)}}><Button variant="success">Buy</Button></td>
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
  
  UserLibrary.propTypes = {
    library: PropTypes.array.isRequired,
    loading: PropTypes.bool
  };
  
  export default UserLibrary;