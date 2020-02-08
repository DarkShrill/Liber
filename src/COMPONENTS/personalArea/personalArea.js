import React, { Component } from "react";
import PropTypes from "prop-types";
import "../../CSS/personalArea/personalArea.css";
import { Input, Badge } from "reactstrap";
import PersonalUserNav from "../mainLayout/header/personalAreaHeader";
import { Form, Button, FormGroup, Label } from "reactstrap";


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
          ownBook:{}
        };
        console.log("UTENTE PERSONAL AREA: ");
        console.log(this.props.user);
      }
      componentDidMount() {
        this.props.getUser();
        //this.props.getOwnBook();
        console.log("PERSONAL AREA");
        this.setState(() => ({
          user: this.props.user
          //ownBook:this.props.ownBook
        }));
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
                      <Label for="exampleFirstName">First Name</Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="examplefirstName"
                        placeholder="First Name"
                        value={this.props.user.name}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleFirstName">Last Name</Label>
                      <Input
                        type="text"
                        name="lastName"
                        id="examplelastName"
                        placeholder="Last Name"
                        value={"NON C'E"}
                      />
                    </FormGroup>
                  </Form>
                </div>
                <div className="col-md-4">
                  <Form>
                    <FormGroup>
                      <Label for="exampleEmail">Username</Label>
                      <Input
                        type="text"
                        name="username"
                        id="exampleUsername"
                        placeholder="Username"
                        value={this.props.user.email}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmail">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="Email"
                        value={this.props.user.email}
                        readOnly
                      />
                    </FormGroup>
                  </Form>
                  <Button outline color="primary">
                    Edit Profile
                  </Button>{" "}
                  <Button outline color="primary">
                    Reset Password
                  </Button>{" "}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="text-center">
                    <hr />
                    <h1>My Books</h1>
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
              </div>
            </div>
          </React.Fragment>
        );
      }
    };

export default PersonalArea;