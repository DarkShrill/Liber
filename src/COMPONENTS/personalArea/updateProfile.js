import React, { Component } from "react";
import "../../CSS/personalArea/personalArea.css";
import { Input } from "reactstrap";
import PersonalUserNav from "../mainLayout/header/personalAreaHeader";
import { Form, FormGroup, Label } from "reactstrap";


/**
 * Personal Area component
 * Displays all books after user log in
 */

// Stateless Component: Has no state and operates with props only. Easy to follow and test

class updateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: this.props.user,
          ownBook:{},
          name:"",
          surname:"",
          email: "",
          password: "",
          passwordNew: "",
          confirmPass: "",
          filter:"Cerca per titolo...",
          filterCasaEditrice:"",
          filterAutore:"",
          filterGenere:"",
          tempBook:[],
          attempts: 0
        };

        if(!this.props.token) {
          console.log("NESSUN TOKEN");
          this.props.history.push("/library");
        }

        this.modificaProfiloHandler.bind(this);
      }

      componentDidMount() {
        this.setState(() => ({
          user: this.props.user
        }));
      }

      modificaProfiloHandler = () => {
        var usr = this.state.user;
        usr.Nome = this.state.name === "" ? this.state.user.Nome : this.state.name;
        usr.Cognome = this.state.surname === "" ? this.state.user.Cognome : this.state.surname;
        usr.Email = this.state.email === "" ? this.state.user.Email : this.state.email;

        if(this.state.password !== "" && this.state.password !== localStorage.getItem("userPassword")) {
            var att = this.state.attempts + 1;
            this.setState(() => ({
                attempts: att
              }));
            if(att === 3) {
                this.props.history.push("/library");
                return;
            }
            alert("Password errata\nTentativi rimanenti: " + (3 - att));
            return;
        }

        if (this.state.passwordNew !== "") {
            if(this.state.passwordNew !== this.state.confirmPass) {
                alert("Passwords don't match");
                return;
            } else {
                usr.Password = this.state.password;
            }
        }

        this.setState(() => ({
          user: usr
        }));

        this.props.sendUpdateProfile(this.state.user);
      }

      render() {
        return (
          <React.Fragment>
            <PersonalUserNav  />
            <div className="container-peronal-area">
            <div className="row rounded profile">
                <div className="col-md-4">
                <div className="prof-pic-div img-responsive border border-black">
                    <img
                    src="https://cdn2.iconfinder.com/data/icons/rcons-user/32/male-shadow-circle-512.png"
                    alt="Profile"
                    className="prof-pic"
                    />
                </div>
                </div>
                <div className="col-md-4">
                <Form>
                    <FormGroup>
                    <Label for="FirstName">Nome</Label>
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
                    <Label for="lastName">Cognome</Label>
                    <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder= {this.state.user.Cognome === undefined ? "Last Name" : this.state.user.Cognome}
                        //value={this.props.user.Cognome}
                        onChange={event => {this.setState({surname : event.target.value})}}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        id="Email"
                        placeholder={this.props.user.Email}
                        onChange={event => {this.setState({email : event.target.value})}}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label for="pass">Password Attuale</Label>
                    <Input
                        type="password"
                        name="pass"
                        id="pass"
                        placeholder= "Password"
                        //value={this.props.user.Cognome}
                        onChange={event => {this.setState({password : event.target.value})}}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label for="newpass">Nuova Password</Label>
                    <Input
                        type="password"
                        name="newpass"
                        id="newpass"
                        placeholder= "Nuova Password"
                        onChange={event => {this.setState({passwordNew : event.target.value})}}
                    />
                    </FormGroup>
                    <FormGroup>
                    <Label for="confPass">Conferma nuova Password</Label>
                    <Input
                        type="password"
                        name="confPass"
                        id="confPass"
                        placeholder= "Conferma Password"
                        onChange={event => {this.setState({confirmPass : event.target.value})}}
                    />
                    </FormGroup>
                </Form>
                <button type="submit" className="btn btn-primary" onClick={this.modificaProfiloHandler}>
                        Modifica Profilo
                </button>
                </div>
            </div>
            </div>
          </React.Fragment>
        );
      }
    };

export default updateProfile;