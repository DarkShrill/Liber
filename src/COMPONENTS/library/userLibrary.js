import React, { Component } from "react";
import PropTypes from "prop-types";
import IndexNav from "../../COMPONENTS/mainLayout/header/userHeader";
import "../../CSS/library/userLibrary.css";
import { Input, Badge } from "reactstrap";



class UserLibrary extends Component {

    constructor(props) {
        super(props);
        this.state = {
          user: this.props.user,
          ownBook:{}
        };
        console.log("UTENTE PERSONAL AREA user lib: ");
        console.log(this.props.user);
        console.log(this.state.user);
      }
      componentDidMount() {
        this.props.getUser();
        //this.props.getBooks();
        //this.props.getOwnBook();
        this.scrollListener = window.addEventListener("scroll", event => {
            this.handleScroll(event);
          });
        console.log("PERSONAL AREA");
        this.setState(() => ({
          user: this.props.user
          //ownBook:this.props.ownBook
        }));
      }
  
    handleScroll = () => {
      const { scrolling, totalPages, page } = this.props;
      if (scrolling) return;
      if (totalPages <= page) return;
      const lastTr = document.querySelector("tr.book > td:last-child");
      const lastTrOffset = lastTr.offsetTop + lastTr.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      var bottomOffset = 20;
      if (pageOffset > lastTrOffset - bottomOffset) this.props.loadMore();
    };
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
                  <div className="col-md-4" />
                  <div className="col-md-4" />
                  <div className="col-md-4">
                    <Input
                      name="search"
                      type="text"
                      placeholder="Search..."
                      className="search"
                    />
                  </div>
                </div>
                {this.props.loading ? (
                  this.props.loader
                ) : (
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Kind</th>
                        <th>Page</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {this.props.library.map(book => (
                        <tr key={book.isbn} className="book">
                          <td>{book.title}</td>
                          <td>{book.author}</td>
                          <td>{book.isbn}</td>
                          <td>{book.publisher}</td>
                          <td>
                            {book.availability ? <Badge color="success">Available</Badge> : <Badge color="danger">Not Available</Badge>}
                          </td>
                        </tr>
                      ))} */}
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