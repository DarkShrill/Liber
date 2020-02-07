import axios from "axios";


/**
 * Function to handle network calls
 */

const errorHandler = error => {
  const err = error.response ? error.response.data : { Message: error.message };
  return { status: "failure", error: err };
};

// base url
 export const baseURL = "http://localhost:2222";
const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    AccessControlAllowOrigin: "*"
  }
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
    email: userData.email,
    username: userData.username,
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
  const url = `${baseURL}/auth/login`;
  const payload = {
    email: userData.username,
    password: userData.password
  };
  return axios
    .post(url, payload, axiosConfig)
    .then(res => {
      return {
        status: "success",
        accessToken: res.data.Token,
        user: res.data.NaMe
      };
    })
    .catch(error => {
      return { status: "failure", error: error.response.data };
    });
};

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
    return { user: res.data.name_usr 
    };
  });
};

export const logoutUser = accessToken => {
  /**
   * Logs user out
   * @argument accessToken
   * @returns API response
   */
  const url = `${baseURL}/auth/logout`;
  const axiosConfigAuth = {
    headers: {
      "Content-Type": "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: "Bearer " + accessToken
    }
  };
  return axios
    .post(url, axiosConfigAuth)
    .then(res => {
      console.log("========>", res);
      return { status: true, loggedOut: true };
    })
    .catch(error => {
      return { status: "failure", error: error.response.data };
    });
};

export const fetchBooks = (page, limit) => {
  /**
   * Fetches all books
   * @argument (page, limit)
   * @returns API response
   */
  const url = `${baseURL}/book`;
  return axios
    .post(url, axiosConfig)
    .then(res => {
      return {
        status: "success",
        books: res.data.Books,
        totalPages: res.data.totalPages,
        author: res.data.currentPage,
        kind:res.data.kind
      };
    })
    .catch(error => {
      return { status: "failure", error: 402/*error.response.data */};
    });
};

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
