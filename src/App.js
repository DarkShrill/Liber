import React, { Component } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import swal from "sweetalert";
import Index from "./COMPONENTS/home/home"
import UserHome from "./COMPONENTS/home/userHome"
import Loader from "./UTILS/loader"
import Login from "./COMPONENTS/login/login"
import Logout from "./COMPONENTS/logout/logout"
import Register from "./COMPONENTS/register/register"
import AboutUs from "./COMPONENTS/about/aboutUs"
import PrivateRoute from "./UTILS/privateRoutes"
import Library from "./COMPONENTS/library/library"
import PersonalArea from "./COMPONENTS/personalArea/personalArea"
import UserLibrary from "./COMPONENTS/library/userLibrary"
import CreditCard from "./COMPONENTS/register/creditCard"
import updateProfile from "./COMPONENTS/personalArea/updateProfile"
import BookDetail from "./COMPONENTS/library/bookDetail"
import {
  loginUser,
  registerUser,
  fetchUser,
  fetchBooks,
  fetchSuggestedBooks,
  fetchOwnBook,
  updateUser,
  fetchFilterGenere,
  fetchFilterAutore,
  fetchFilterCasaEditrice,
  fetchBuy,
  loginRefresh,
  logoutUser,
  insertCard
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
        token:false,
        ownBook:[],
        tempBook: false,
        suggestedBooks:[],
        filterGenere : [],
        filterAutore : [],
        filterCasaEditrice : [],
        activityTimer: setInterval(this.refreshLogin, 1140000),
        refreshTimer: setInterval(this.refreshLogin, 1200000)
      };

      loginUser.bind(this);
      registerUser.bind(this);
      fetchUser.bind(this);
      fetchBooks.bind(this);
      fetchOwnBook.bind(this);
      updateUser.bind(this);

      var _self = this;
      document.addEventListener("click", function(){
        _self.resetActivityTimer();
      });
      document.addEventListener("keydown", function(){
        _self.resetActivityTimer();
      });
  }

  resetActivityTimer = () =>  {
    clearInterval(this.state.activityTimer);
    this.setState({
      activityTimer: setInterval(this.refreshLogin, 1140000)
    });
  }

  setDetailBook = (book, callback) => {
    this.setState({
      tempBook: book
    }, callback);
  }

  sendUpdateProfile = user => {
    let accessToken = localStorage.getItem("accessToken");
    let accessPassword = localStorage.getItem("userPassword");
    this.setState(() => ({ token: accessToken }));

    var toSend = {};
    if(user.Password) {
      toSend = {user: user,token:accessToken};
    } else {
      toSend = {user: user,token:accessToken,password:accessPassword};
    }

    updateUser(toSend).then(res => {
      this.setState(() => ({
        registered: true,
        regErrors: {},
        loading: false,
      }));
      swal("Profilo aggiornato correttamente",{timer: 1500});
    }).catch(error => {
      swal("Si è verificato un errore",{timer: 2500});
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
        swal("Registrazione effettuata con successo",{timer: 2500});
      } else {
        swal("Registrazione fallita",{timer: 2500});
        this.setState(() => ({ regErrors: res.error, loading: false }));
      }
    });
  };

  addCard = cardData => {
    /**
     * Registers new user
     */
    insertCard(cardData).then(res => {
      if (res.status === "success") {
        var usr = this.state.user;
        usr.NumeroCarta = cardData.NumeroCarta

        this.setState(() => ({
          user: usr
        }));

        console.log(this.state.user);

        swal("Carta inserita con successo",{timer: 2500});
      } else {
        swal("Si è verificato un problema! Per favore, riprova",{timer: 2500});
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
    var _self = this;
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
          token:res.accessToken
        }))
        _self.getOwnBook();
        swal("Login effettuato con successo" , { buttons: false, timer: 1500 });
      } else {
        swal("Credenziali errate! Per favore, riprova", { buttons: false, timer: 2500 });
        this.setState(() => ({ loginErrors: res.error, loading: false }));
      }
    });
  };

  refreshLogin = () => {
    if(this.state.token) {
      loginRefresh({token: this.state.token});
    }
  }

  logOut = () => {
    /**
     * Logs user out
     */
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("userPassword");
    logoutUser(this.state.token);
    this.setState(() => ({
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
      token:false,
      ownBook:[],
      tempBook: false,
      suggestedBooks:[],
      filterGenere : [],
      filterAutore : [],
      filterCasaEditrice : [],
      activityTimer: setInterval(this.refreshLogin, 1140000),
      refreshTimer: setInterval(this.refreshLogin, 1200000)
    }));
  };

  getBooks = () => {
    /**
     * Gets all books
     */
    if (!this.state.scrolling) this.toggleLoading();
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

  getSuggestedBooks = () => {
    /**
     * Gets all books
     */
    if (!this.state.scrolling) this.toggleLoading();

    var tmp = [];
    var i;
    var c=0;
    for(i in this.state.ownBook) {
      tmp[c] = this.state.ownBook[i].ISBN;
      c++;
    }
    for(i in this.state.suggestedBooks) {
      if(tmp.indexOf(this.state.suggestedBooks[i].ISBN) >= 0) {
        console.log("DUPLICATE: " + this.state.suggestedBooks[i].ISBN);
      }
      tmp[c] = this.state.suggestedBooks[i].ISBN;
      c++;
    }

    var data = {  token: this.state.token, 
                  userId: this.state.user.ID, 
                  previous_ISBN_list: tmp
    }
    fetchSuggestedBooks(data).then(res => {

      if(res.status === "success") {

        if(res.books.length === 0){

          this.setState(() => ({
            suggestedBooks: [],
            loading: false
          }));
        } else {
          var i=0;
          var tmp = [];
          for(i in res.books) {
            tmp.push(res.books[i]);
          }
          this.setState(() => ({
            suggestedBooks: tmp,
            loading: false
          }));
        }
      } else {
        this.setState(() => ({ error: res.error, loading: false, suggestedBooks: [] }));
      }
    });
  };

  getOwnBook = () => {
    let accessToken = localStorage.getItem("accessToken");
    var _self = this;
    fetchOwnBook({token:accessToken,ID:this.state.user.ID}).then(res => {

      if(res.status === "success") {
        this.setState(() => ({
          ownBook:[...res.ownBook]
        }));
        _self.getSuggestedBooks();
      }else {
        this.setState(() => ({ error: res.error, loading: false }));
      } 
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
    var _self = this;
    fetchBuy({token: accessToken,IDUtente:this.state.user.ID,ISBNLibro:data.ISBN}).then(res => {

      console.log(res);
      if(res.status === "success"){
        swal("Grazie per il tuo acquisto" , { buttons: false, timer: 1500 });
        _self.getSuggestedBooks();
        this.setState(() => ({
        loading: false,
        error: {}
      }))
      }else{
         this.setState(() => ({ error: res.error, loading: false }));
         if(res.error === "401") {
          swal("Libro già presente nella tua libreria" , { buttons: false, timer: 1500 });
         } else {
          swal("Si è verificato un errore durante l'acquisto. Per favore riprovare più tardi" , { buttons: false, timer: 1500 });
         }
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
              path="/creditCard"
              render={props => (
                <CreditCard
                  {...props}
                  addCard={this.addCard}
                  token={this.state.token}
                  user={this.state.user}
                  toggleLoading={this.toggleLoading}
                  loader={<Loader />}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              path="/bookDetail"
              render={props => (
                <BookDetail
                  {...props}
                  addCard={this.addCard}
                  component={BookDetail}
                  token={this.state.token}
                  user={this.state.user}
                  tempBook={this.state.tempBook}
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
              path="/aboutUs"
              render={props => ( 
              <AboutUs
              {...props}
              component={AboutUs}
              token={this.state.token}
              user={this.state.user}
              />)}
            />
            <PrivateRoute
              path="/updateProfile"
              component={updateProfile}
              user={this.state.user}
              token={this.state.token}
              sendUpdateProfile={this.sendUpdateProfile}
            /> }
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
              token={this.state.token}
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
                  token={this.state.token}
                  getBooks={this.getBooks}
                  tempBook={this.state.tempBook}
                  loader={<Loader />}
                  loading={this.state.loading}
                  scrolling={this.state.scrolling}
                  setDetailBook={this.setDetailBook}
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
              token={this.state.token}
              user={this.state.user}
              getUser={this.getUser}
              getOwnBook={this.getOwnBook}
              ownBook={this.state.ownBook}
              loader={<Loader />}
              loading={this.state.loading}
              initFilter = {this.initFilter}
              filterGenere = {this.state.filterGenere}
              filterAutore = {this.state.filterAutore}
              filterCasaEditrice = {this.state.filterCasaEditrice}
            />
            <PrivateRoute
              path="/userLibrary"
              component={UserLibrary}
              token={this.state.token}
              user={this.state.user}
              library={this.state.library}
              tempBook={this.state.tempBook}
              getBooks={this.getBooks}
              setDetailBook={this.setDetailBook}
              getOwnBook={this.getOwnBook}
              ownBook={this.state.ownBook}
              loader={<Loader />}
              suggestedBooks={this.state.suggestedBooks}
              getSuggestedBooks={this.getSuggestedBooks}
              loading={this.state.loading}
              initFilter = {this.initFilter}
              filterGenere = {this.state.filterGenere}
              filterAutore = {this.state.filterAutore}
              filterCasaEditrice = {this.state.filterCasaEditrice}
              buyLib = {this.buyLib}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

