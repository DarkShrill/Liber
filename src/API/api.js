import axios from "axios";


/**
 * Function to handle network calls
 */

const errorHandler = error => {
  const err = error.response ? error.response.data : { Message: error.message };
  return { status: "failure", error: err };
};

// base url
 //export const baseURL = "http://localhost:2222";
  export const baseURL = "https://localhost/Liber/Liber%20Server";
//export const baseURL = "localhost/dashboard/"
const axiosConfig = {
  "Content-Type": "application/json",
  AccessControlAllowOrigin: "*",
};


export const registerUser = userData => {
  /**
   * Calls register user api endpoint
   * @argument userData
   * @returns API response
   */
  const url = `${baseURL}/user/create.php`;
  const payload = {
    Nome: userData.first_name,
    Cognome: userData.last_name,
    Email: userData.email,
    Password: userData.password,
    confirm_password: userData.confirm_password
  };

  return axios
    .post(url, payload, axiosConfig)
    .then(res => {
      return { status: "success", registered: true };
    })
    .catch(error => {
      return { status: "failure", error: error.response.data };
    });
};

export const insertCard = cardData => {
  /**
   * Calls register user api endpoint
   * @argument userData
   * @returns API response
   */
  const url = `${baseURL}/user/add_card.php`;
  const payload = {
    token: cardData.token,
    ID: cardData.ID,
    NumeroCarta: cardData.NumeroCarta
  };

  console.log(payload);
  return axios
    .post(url, payload, axiosConfig)
    .then(res => {
      return { status: "success", cardInserted: cardData.NumeroCarta };
    })
    .catch(error => {
      return { status: "failure", error: error.response.data };
    });
};


export const loginUser = userData => {
  /**
   * Calls login user api endpoint
   * @argument userData
   * @returns API response
   */
  const url = `${baseURL}/login/login.php`;
  const payload = {
    username: userData.Email,
    password: userData.password
  };
  return axios
    .post(url,payload,axiosConfig)
    .then(res => {
      console.log(res.data.token);
      return {
        status: "success",
        accessToken: res.data.token,
        user: res.data.account
      };
    })
    .catch(error => {
      console.log(error);
      return { status: "failure", error: error.response.data };
    });
};

export const loginRefresh = userData => {
  const url = `${baseURL}/login/refresh.php`;
  const payload = {
    token: userData.token,
  };
  return axios
    .post(url,payload,axiosConfig)
    .then(res => {
      return {
        status: "success"
      };
    })
    .catch(error => {
      console.log(error);
      return { status: "failure", error: error.response.data };
    });
};

export const updateUser = data => {
  const url = `${baseURL}/user/update.php`;
  const payload = {
    token: data.token,
    ID: data.user.ID,
    Nome:data.user.Nome,
    Cognome:data.user.Cognome,
    Email:data.user.Email,
    Password: data.password ? data.password : data.user.Password,
  };
  console.log("UPLOAD USER : ");
  console.log(payload);
  return axios.post(url,payload, axiosConfig).then(res => {
    return { status : "success"
    };
    }).catch(error => {
      return { status : "error"
    };
    }
    );
}

export const fetchUser = userData => {
  /**
   * Fetches user details
   * @argument accessToken
   * @returns user details
   */
  const url = `${baseURL}/user`;
  const payload = {
    email: userData
  };

  return axios.post(url,payload, axiosConfig).then(res => {
    console.log("PAYLOAD = " + payload.email);
    console.log(res);
    return { user: res.data.usr
    };
  });
};

export const logoutUser = accessToken => {
  /**
   * Logs user out
   * @argument accessToken
   * @returns API response
   */
  const url = `${baseURL}/login/logout.php`;
  console.log(accessToken);
  const payload = {
    token : accessToken,
  };
  return axios
    .post(url,payload,axiosConfig)
    .then(res => {
      console.log("========>", res);
      return { status: true, loggedOut: true };
    })
    .catch(error => {
      console.log(error.response);
      return { status: "failure", error: error.response.data };
    });
};

export const fetchBuy = (data) => {
  const url = `${baseURL}/payment/pay.php`;
  const payload = {
    token:data.token,
    IDUtente: data.IDUtente,
    ISBNLibro: data.ISBNLibro,
  }
  console.log("BUY");
  console.log(payload);
  return axios
    .post(url, payload ,axiosConfig)
    .then(res => {
      return {
        status: "success",
      };
    })
    .catch(error => {
      console.log(error);
      if(error.toString().includes("401")) {
        return { status: "failure", error: "401"/*error.data.outcome*/};
      } else {
        return { status: "failure", error: "400"/*error.data.outcome*/};
      }
      
    });
}

export const fetchBooks = () => {
  /**
   * Fetches all books
   * @argument (page, limit)
   * @returns API response
   */
  const url = `${baseURL}/book/read.php`;
  return axios
    .post(url, axiosConfig)
    .then(res => {
      console.log("BOOK");
      console.log(res);
      return {
        status: "success",
        books: res.data.libri
      };
    })
    .catch(error => {
      console.log("ERROR " + error);
      return { status: "failure", error: 402/*error.response.data */};
    });
};

export const fetchSuggestedBooks = (data) => {
  /**
   * Fetches all books
   * @argument (page, limit)
   * @returns API response
   */
  const url = `${baseURL}/library/suggested_books.php`;
  var payload = {
    token: data.token,
    IDUtente: data.userId,
    previous_ISBN_list: data.previous_ISBN_list
  }
  return axios
    .post(url, payload, axiosConfig)
    .then(res => {
      console.log("BOOK");
      console.log(res);
      return {
        status: "success",
        books: res.data
      };
    })
    .catch(error => {
      console.log("ERROR " + error);
      return { status: "failure", error: 402/*error.response.data */};
    });
};

export const fetchFilterGenere = () => {
  const url = `${baseURL}/book/search_filter.php`;
  const payload = {
    Filtro: "Genere",
  };
  return axios
    .post(url,payload, axiosConfig)
    .then(res => {
      console.log("FILTER GENERE");
      console.log(res);
      return {
        status: "success",
        filter: res.data
      };
    })
    .catch(error => {
      console.log("ERROR " + error);
      return { status: "failure", error: 402/*error.response.data */};
    });
}

export const fetchFilterAutore = () => {
  const url = `${baseURL}/book/search_filter.php`;
  const payload = {
    Filtro: "Autore",
  };
  return axios
    .post(url,payload, axiosConfig)
    .then(res => {
      return {
        status: "success",
        filter: res.data
      };
    })
    .catch(error => {
      console.log("ERROR " + error);
      return { status: "failure", error: 402/*error.response.data */};
    });
}

export const fetchFilterCasaEditrice= () => {
  const url = `${baseURL}/book/search_filter.php`;
  const payload = {
    Filtro: "CasaEditrice",
  };
  return axios
    .post(url,payload, axiosConfig)
    .then(res => {
      return {
        status: "success",
        filter: res.data
      };
    })
    .catch(error => {
      console.log("ERROR " + error);
      return { status: "failure", error: 402/*error.response.data */};
    });
}

export const borrowingHistory = accessToken => {
  /**
   * Gets user's borrowing history
   */
  const url = `${baseURL}/users/books`;
  const axiosConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: "Bearer " + accessToken
    }
  };
  return axios
    .get(url, axiosConfigAuth)
    .then(res => {
      return { status: "success", history: res.data.borrowHistory };
    })
    .catch(errorHandler);
};

export const fetchOwnBook = userData =>{

    const url = `${baseURL}/library/read.php`;
    
    const payload = {
      token: userData.token,
      IDUtente:userData.ID,
    };
    console.log("OWN BOOK payload");
    console.log(payload);
    return axios
      .post(url,payload, axiosConfig)
      .then(res => {
        console.log("OWN BOOK ");
        console.log(res);
        return {
          status: "success",
          ownBook: res.data.libri
        };
      })
      .catch(error => {
        console.log("ERROR " + error);
        return { status: "failure", error: 402/*error.response.data */};
      });

}


// export const fetchBooks = () => {
//   /**
//    * Fetches all books
//    * @argument
//    * @returns API response
//    */
//   const url = `${baseURL}/books`;
//   return axios
//     .get(url, axiosConfig)
//     .then(res => {
//       return {
//         status: "success",
//         books: res.data.Books,
//         totalPages: res.data.totalPages,
//         currentPage: res.data.currentPage
//       };
//     })
//     .catch(error => {
//       return { status: "failure", error: error.response.data };
//     });
// };
