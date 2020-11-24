import React, { Component } from "react";

//axios
import axios from "../../axios-root";

import Spinner from "../../components/Spinner/Spinner";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, redirect: false };
  }

  componentWillMount() {
    axios
      .post("/auth/logout")
      .then((response) => {
        if (response.data) {
          const cookies = this.props.cookies;
          cookies.set("isAuthenticated", false, { path: "/" });
          cookies.set("userData", null, { path: "/" });
          this.props.history.push("/auth/login");
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return <Spinner />;
  }
}

export default Logout;
