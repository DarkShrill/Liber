import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import swal from "sweetalert";
import Index from "./COMPONENTS/home/home"
import UserHome from "./COMPONENTS/home/userHome"
import Loader from "./UTILS/loader"
import Login from "./COMPONENTS/login/login"
import Logout from "./COMPONENTS/logout/logout"
import Register from "./COMPONENTS/register/register"
import aboutUs from "./COMPONENTS/about/aboutUs"
import PrivateRoute from "./UTILS/privateRoutes"

import Firebase from "./COMMON/firebase/firebase";
import {
  loginUser,
  registerUser,
  fetchUser
} from "./API/api";


class App extends Component {
  constructor(props){
      super(props);
      this.state = {
        loading: false,
        error: {},
        loginErrors: {},
        regErrors: {},
        bookErrors: {},
        deleteBookErrors: {},
        user: {},
        loggedIn: false,
        registered: false,
        library: [],
        scrolling: false,
        _merda:{}
      };
  }

  register = regData => {
    /**
     * Registers new user
     */
    registerUser(regData).then(res => {
      if (res.status === "success") {
        this.setState(() => ({
          registered: true,
          regErrors: {},
          loading: false
        }));
        swal("Registration successful",{timer: 2500});
      } else {
        swal("Registration fail",{timer: 2500});
        this.setState(() => ({ regErrors: res.error, loading: false }));
      }
    });
  };


  toggleLoading = () => {
    /**
     * Toggles loading status
     */
    this.setState(() => ({ loading: !this.state.loading }));
  };

  logIn = loginData => {
    /**
     * Logs in existing user
     */
    loginUser(loginData).then(res => {
      if (res.status === "success") {
        localStorage.setItem("accessToken", res.accessToken);
        // set state is an asynchronous function
        // Pass function to make it deterministic
        this.setState(() => ({
          loggedIn: true,
          loading: false,
          loginErrors: {}
        }));
        swal("Logged In Successfully " , { buttons: false, timer: 2500 });
        //swal(String(res.accessToken), { buttons: false, timer: 2500 });
      } else {
        swal("Logged In FAILED", { buttons: false, timer: 2500 });
        this.setState(() => ({ loginErrors: res.error, loading: false }));
      }
    });
  };

  logOut = () => {
    /**
     * Logs user out
     */
    localStorage.removeItem("accessToken");
    this.setState(() => ({
      loggedIn: false,
      user: {},
      _merda:{}
    }));
  };

  getUser = () => {
    /**
     * Gets user details
     */
    let accessToken = localStorage.getItem("accessToken");
    fetchUser(accessToken).then(res => {
      this.setState(() => ({ user: res.user }));
    });
  };

  
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/loader" component={Loader} />
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  loginErrors={this.state.loginErrors}
                  loggedIn={this.state.loggedIn}
                  logIn={this.logIn}
                  toggleLoading={this.toggleLoading}
                  loader={<Loader />}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              path="/register"
              render={props => (
                <Register
                  {...props}
                  noErrors={this.noErrors}
                  register={this.register}
                  registered={this.state.registered}
                  regErrors={this.state.regErrors}
                  toggleLoading={this.toggleLoading}
                  loading={this.state.loading}
                  loader={<Loader />}
                />
              )}
            />
            <Route path="/aboutUs" component={aboutUs}/>

            <PrivateRoute
              path="/logout"
              component={Logout}
              logOut={this.logOut}
            /> }
            {<PrivateRoute
              path="/user"
              component={UserHome}
              user={this.state.user}
              borrowed={this.borrowed}
              getUser={this.getUser}
              borrowedBooks={this.state.borrowedBooks}
              returnBook={this.returnBook}
              loader={<Loader />}
              loading={this.state.loading}
            />   }





            {/* <Route path="/loader" component={Loader} />
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  loginErrors={this.state.loginErrors}
                  loggedIn={this.state.loggedIn}
                  isAdmin={this.state.isAdmin}
                  logIn={this.logIn}
                  toggleLoading={this.toggleLoading}
                  loader={<Loader />}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              path="/register"
              render={props => (
                <Register
                  {...props}
                  noErrors={this.noErrors}
                  register={this.register}
                  registered={this.state.registered}
                  regErrors={this.state.regErrors}
                  toggleLoading={this.toggleLoading}
                  loading={this.state.loading}
                  loader={<Loader />}
                />
              )}
            />
            <Route
              path="/library"
              render={props => (
                <Library
                  {...props}
                  library={this.state.library}
                  getBooks={this.getBooks}
                  loader={<Loader />}
                  loading={this.state.loading}
                  page={this.state.page}
                  totalPages={this.state.totalPages}
                  scrolling={this.state.scrolling}
                  loadMore={this.loadMore}
                />
              )}
            />
            <PrivateRoute path="/admin" component={AdminDash} {...this.state} />
            <PrivateRoute
              path="/managebooks"
              renderModal={this.state.renderModal}
              renderDeleteAlert={this.state.renderDeleteAlert}
              library={this.state.library}
              component={ManageBooks}
              getBooks={this.getBooks}
              toggleModal={this.toggleModal}
              newBook={this.newBook}
              updateBook={this.updateBook}
              bookErrors={this.state.bookErrors}
              deleteBookErrors={this.state.deleteBookErrors}
              toggleDeleteAlert={this.toggleDeleteAlert}
              deleteBook={this.deleteBook}
              loader={<Loader />}
              loading={this.state.loading}
              page={this.state.page}
              totalPages={this.state.totalPages}
              scrolling={this.state.scrolling}
              loadMore={this.loadMore}
            />
            <PrivateRoute
              path="/user"
              component={UserDash}
              user={this.state.user}
              borrowed={this.borrowed}
              getUser={this.getUser}
              borrowedBooks={this.state.borrowedBooks}
              returnBook={this.returnBook}
              loader={<Loader />}
              loading={this.state.loading}
            />
            <PrivateRoute
              path="/borrow"
              library={this.state.library}
              component={Borrow}
              getBooks={this.getBooks}
              borrowBook={this.borrowBook}
              loading={this.state.loading}
              loader={<Loader />}
              page={this.state.page}
              totalPages={this.state.totalPages}
              scrolling={this.state.scrolling}
              loadMore={this.loadMore}
            />
            <PrivateRoute
              path="/history"
              component={BorrowHistory}
              borrowHistory={this.borrowHistory}
              borrowedBooksHistory={this.state.borrowedBooksHistory}
              loading={this.state.loading}
              loader={<Loader />}
            />
            <PrivateRoute
              path="/logout"
              component={Logout}
              logOut={this.logOut}
            /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

