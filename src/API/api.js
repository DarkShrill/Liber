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
  export const baseURL = "http://localhost:80/Liber/Liber%20Server";
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
  const url = `${baseURL}/auth/register`;
  const payload = {
    first_name: userData.first_name,
    last_name: userData.last_name,
    email: userData.Email,
    password: userData.password,
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

export const updateUser = data => {
  const url = `${baseURL}/user/update.php`;
  const payload = {
    token: data.token,
    ID: data.user.ID,
    Nome:data.user.Nome,
    Cognome:data.user.Cognome,
    Email:data.user.Email,
    Password:data.password,
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
      console.log("ERROR " + error);
      return { status: "failure", error: 43/*error.response.data */};
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
