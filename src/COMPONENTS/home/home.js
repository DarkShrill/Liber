import React, { Component } from "react";
import "../../CSS/home/home.css";
import { Redirect} from "react-router-dom";

/**
 * Applicationshome page component
 */

class Index extends Component {
  render() {
    return (
      <Redirect to="/library" />
    );
  }
}

export default Index;