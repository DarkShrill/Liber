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
import Library from "./COMPONENTS/library/library"
import PersonalArea from "./COMPONENTS/personalArea/personalArea"
import UserLibrary from "./COMPONENTS/library/userLibrary"
import {
  loginUser,
  registerUser,
  fetchUser,
  fetchBooks,
  fetchOwnBook,
  updateUser,
  fetchFilterGenere,
  fetchFilterAutore,
  fetchFilterCasaEditrice,
  fetchBuy
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
        author:{},
        kind:{},
        token:{},
        ownBook:[],
        filterGenere : [],
        filterAutore : [],
        filterCasaEditrice : []
      };

      loginUser.bind(this);
      registerUser.bind(this);
      fetchUser.bind(this);
      fetchBooks.bind(this);
      fetchOwnBook.bind(this);
      updateUser.bind(this);
  }

  sendUpdateProfile = user => {
    let accessToken = localStorage.getItem("accessToken");
    let accessPassword = localStorage.getItem("userPassword");
    console.log("PASS")
    console.log(accessPassword);
    this.setState(() => ({ token: accessToken }));
    updateUser({user: user,token:accessToken,password:accessPassword}).then(res => {
      this.setState(() => ({
        registered: true,
        regErrors: {},
        loading: false,
      }));
      swal("Update Data Successfully",{timer: 1500});
    }).catch(error => {
      swal("Update Data  fail",{timer: 2500});
      this.setState(() => ({ regErrors: error.error, loading: false }));
    });
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
        localStorage.setItem("userData", loginData.Email);
        localStorage.setItem("userPassword", loginData.password);
        // set state is an asynchronous function
        // Pass function to make it deterministic
        this.setState(() => ({
          loggedIn: true,
          loading: false,
          loginErrors: {},
          user : res.user,
          token:res.token
        }));
        swal("Logged In Successfully " , { buttons: false, timer: 1500 });
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
    localStorage.removeItem("userData");
    localStorage.removeItem("userPassword");
    this.setState(() => ({
      loggedIn: false,
      user: {},
      _merda:null
    }));
  };

  // getUser = () => {
  //   /**
  //    * Gets user details
  //    */
  //   let accessToken = localStorage.getItem("accessToken");
  //   let accessAccount = localStorage.getItem("userData");
  //   console.log("ACCESS ACCOUNT == " + accessAccount);
  //   fetchUser(accessAccount).then(res => {
  //     console.log(res);
  //     this.setState(() => ({ user: res.user }));
  //     //this.setState({ user: res.user.usr });
  //     console.log(res.user);
  //     console.log(this.state.user);
  //   }).catch(res => {
  //     console.log("------------    ERRORE");
  //   });
  // };

  getBooks = () => {
    /**
     * Gets all books
     */
    if (!this.state.scrolling) this.toggleLoading();
    const { library } = this.state;
    fetchBooks().then(res => {
      console.log(res);
      res.status === "success"
        ? this.setState(() => ({
            library: [...res.books],
            loading: false,
            scrolling: false,
            error: {}
          }))
        : this.setState(() => ({ error: res.error, loading: false }));
    });
  };

  getOwnBook = () => {
    let accessToken = localStorage.getItem("accessToken");
    fetchOwnBook({token:accessToken,ID:this.state.user.ID}).then(res => {
      res.status === "success" ? (
        this.setState(() => ({
          ownBook:[...res.ownBook]
        })))
        :
        this.setState(() => ({ error: res.error, loading: false }));
    })

  } 

  initFilter = () => {
      fetchFilterGenere().then(res => {
          res.status === "success" ? 
          this.setState(() => ({
            filterGenere: [...res.filter],
            loading: false,
            error: {}
          }))
          : this.setState(() => ({ error: res.error, loading: false }));
      })

      fetchFilterAutore().then(res => {
        res.status === "success" ? 
        this.setState(() => ({
          filterAutore: [...res.filter],
          loading: false,
          error: {}
        }))
        : this.setState(() => ({ error: res.error, loading: false }));
    })

    fetchFilterCasaEditrice().then(res => {
      res.status === "success" ? 
      this.setState(() => ({
        filterCasaEditrice: [...res.filter],
        loading: false,
        error: {}
      }))
      : this.setState(() => ({ error: res.error, loading: false }));
  })
  }

  buyLib = data => {
    let accessToken = localStorage.getItem("accessToken");
    fetchBuy({token: accessToken,IDUtente:this.state.user.ID,ISBNLibro:data.ISBN}).then(res => {

      if(res.status === "success"){
        swal("Buy status : SUCCESS" , { buttons: false, timer: 1500 });
        this.setState(() => ({
        loading: false,
        error: {}
      }))
      }else{
         this.setState(() => ({ error: res.error, loading: false }));
         swal("Buy status : FAIL" , { buttons: false, timer: 1500 });
      }
    });
  }

  
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
            <Route
              path="/library"
              render={props => (
                <Library
                  {...props}
                  library={this.state.library}
                  getBooks={this.getBooks}
                  loader={<Loader />}
                  loading={this.state.loading}
                  scrolling={this.state.scrolling}
                  loadMore={this.loadMore}
                  initFilter = {this.initFilter}
                  filterGenere = {this.state.filterGenere}
                  filterAutore = {this.state.filterAutore}
                  filterCasaEditrice = {this.state.filterCasaEditrice}
                />
              )}
            />
            <PrivateRoute
              path="/personalArea"
              component={PersonalArea}
              user={this.state.user}
              getUser={this.getUser}
              getOwnBook={this.getOwnBook}
              ownBook={this.state.ownBook}
              loader={<Loader />}
              loading={this.state.loading}
              sendUpdateProfile={this.sendUpdateProfile}
              initFilter = {this.initFilter}
              filterGenere = {this.state.filterGenere}
              filterAutore = {this.state.filterAutore}
              filterCasaEditrice = {this.state.filterCasaEditrice}
            />
            <PrivateRoute
              path="/userLibrary"
              component={UserLibrary}
              user={this.state.user}
              library={this.state.library}
              getBooks={this.getBooks}
              getOwnBook={this.getOwnBook}
              ownBook={this.state.ownBook}
              loader={<Loader />}
              loading={this.state.loading}
              initFilter = {this.initFilter}
              filterGenere = {this.state.filterGenere}
              filterAutore = {this.state.filterAutore}
              filterCasaEditrice = {this.state.filterCasaEditrice}
              buyLib = {this.buyLib}
            />



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

