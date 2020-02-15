import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../CSS/personalArea/personalArea.css";
import { Input, Badge } from "reactstrap";
import PersonalUserNav from "../mainLayout/header/personalAreaHeader";
import { Form, Button, FormGroup, Label } from "reactstrap";
import { DropdownButton,Dropdown } from "react-bootstrap";


/**
 * Personal Area component
 * Displays all books after user log in
 */

// Stateless Component: Has no state and operates with props only. Easy to follow and test

class PersonalArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: this.props.user,
          ownBook:{},
          name:"",
          surname:"",
          filter:"Cerca per titolo...",
          filterCasaEditrice:"",
          filterAutore:"",
          filterGenere:"",
          tempBook:[]

        };
        console.log("UTENTE PERSONAL AREA: ");
        console.log(this.props.user);

        this.modificaProfiloHandler.bind(this);
      }
      componentDidMount() {
        // this.props.getUser();
        this.props.getOwnBook();
        this.props.initFilter();
        console.log("PERSONAL AREA");
        this.setState(() => ({
          user: this.props.user
          //ownBook:this.props.ownBook
        }));
      }

      modificaProfiloHandler = () => {
        this.state.user.Nome = this.state.name === "" ? this.state.user.Nome : this.state.name;
        this.state.user.Cognome = this.state.surname === "" ? this.state.user.Cognome : this.state.surname;
        this.props.sendUpdateProfile(this.state.user);
      }

      changePasswordHandler(){

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


      render() {
        return (
          <React.Fragment>
            <PersonalUserNav  />
            <div className="container-peronal-area">
              <div className="row border border-white rounded profile">
                <div className="col-md-4">
                  <div className="prof-pic-div img-responsive border border-white">
                    <img
                      src="https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-shadow-circle-512.png"
                      alt="Profile Picture"
                      className="prof-pic"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <Form>
                    <FormGroup>
                      <Label for="FirstName">First Name</Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder= {this.state.user.Nome === undefined ? "First Name" : this.state.user.Nome}
                        //value={this.state.user.Nome}
                        onChange={event => {this.setState({name : event.target.value})}}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="FirstName">Last Name</Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder= {this.state.user.Cognome === undefined ? "Last Name" : this.state.user.Cognome}
                        //value={this.props.user.Cognome}
                        onChange={event => {this.setState({surname : event.target.value})}}
                      />
                    </FormGroup>
                  </Form>
                </div>
                <div className="col-md-4">
                  <Form>
                    <FormGroup>
                      <Label for="Email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="Email"
                        placeholder="Email"
                        value={this.props.user.Email}
                        readOnly
                      />
                    </FormGroup>
                  </Form>
                  <button type="submit" className="btn btn-primary" onClick={this.modificaProfiloHandler}>
                        Modifica Profilo
                  </button>
                  <button type="submit" className="btn btn-primary" onClick={this.changePasswordHandler}>
                        Reset Password
                  </button>
                </div>
              </div>
              <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <hr />
                <h1>My Books</h1>
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
                          this.props.ownBook.filter((tile) => tile.Titolo.toLowerCase().includes(this.state.filter.toLowerCase())).map(book => (
                          
                              
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
                              this.props.ownBook.map(book => (
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
                            this.props.ownBook.filter((tile) => tile.Autore.toLowerCase().includes(this.state.filterAutore.toLowerCase())).map(book => (
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
                            this.props.ownBook.filter((tile) => tile.Genere.toLowerCase().includes(this.state.filterGenere.toLowerCase())).map(book => (
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
                            this.props.ownBook.filter((tile) => tile.CasaEditrice.toLowerCase().includes(this.state.filterCasaEditrice.toLowerCase())).map(book => (
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
    };

export default PersonalArea;