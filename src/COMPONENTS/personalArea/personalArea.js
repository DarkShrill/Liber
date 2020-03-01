import React, { Component } from "react";
import "../../CSS/personalArea/personalArea.css";
import { Input } from "reactstrap";
import PersonalUserNav from "../mainLayout/header/personalAreaHeader";
import { Button} from "reactstrap";
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

        if(!this.props.token) {
          console.log("NESSUN TOKEN");
          this.props.history.push("/library");
        }

        this.modificaProfiloHandler.bind(this);
      }

      

      componentDidMount() {
        // this.props.getUser();
        this.props.initFilter();
        console.log("PERSONAL AREA");
        this.setState(() => ({
          user: this.props.user
          //ownBook:this.props.ownBook
        }));
      }

      modificaProfiloHandler = () => {
        var usr = this.state.user;
        usr.Nome = this.state.name === "" ? this.state.user.Nome : this.state.name;
        usr.Cognome = this.state.surname === "" ? this.state.user.Cognome : this.state.surname;

        this.setState(() => ({
          user: usr
        }));

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


      displayBooks = books => {

        var elements = [];

        for(let i = 0; i < books.length; i++) {
          elements.push(<div key={books[i].ISBN} className="book-element-container-personal">
            <div className="book-cover"></div>
            <div className="base-text">{books[i].Titolo}</div>
            <div className="base-text">{books[i].Autore}</div>
          </div>);
        }

        return elements;
    }
    
      render() {
        var elements;
        var books;
    
        if(this.state.filter !== "Cerca per titolo..." && this.state.filter !== "" && (this.state.filterCasaEditrice === "" || this.state.filterAutore  === "" ||
          this.state.filterGenere === "")) {
            books = this.props.ownBook.filter((tile) => tile.Titolo.toLowerCase().includes(this.state.filter.toLowerCase()));
        } else if(this.state.filterCasaEditrice === "" && this.state.filterAutore === "" && this.state.filterGenere === "") {
          books = this.props.ownBook;
        } else if(this.state.filterAutore !== "") {
          books = this.props.ownBook.filter((tile) => tile.Autore.toLowerCase().includes(this.state.filterAutore.toLowerCase()));
        } else if(this.state.filterGenere !== "") {
          books = this.props.ownBook.filter((tile) => tile.Genere.toLowerCase().includes(this.state.filterGenere.toLowerCase()));
        } else if(this.state.filterCasaEditrice !== "") {
          books = this.props.ownBook.filter((tile) => tile.CasaEditrice.toLowerCase().includes(this.state.filterCasaEditrice.toLowerCase()));
        } else {
          console.log("Errore");
        }
    
        elements = this.displayBooks(books);
        
        return (
          <React.Fragment>
            <PersonalUserNav  />
            <div className="container loginResponsive">
            <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <hr />
                <h1>I miei libri</h1>
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
                  <Button variant="warning" className="btn btn-primary" onClick={this.resetFilter}>Resetta</Button>
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
    };

export default PersonalArea;