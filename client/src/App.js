import React, { Component } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import axios from "./axios-root";

import Auxillary from "./hoc/Auxillary/Auxillary";
import ErrorHandler from "./hoc/ErrorHandler/ErrorHandler";

import AdminLayout from "./layouts/Admin.js";
import AuthLayout from "./layouts/AuthLayout";
import TaskLayout from "./layouts/TaskLayout.js";

import { withCookies } from "react-cookie";

class App extends Component {
  state = {};

  render() {
    let routes = (
      <Switch>
        <Route
          path="/auth"
          render={(props) => (
            <AuthLayout {...props} cookies={this.props.cookies} />
          )}
        />
        <Redirect from="/" to="/auth/login" />
      </Switch>
    );

    const cookies = this.props.cookies.cookies;
    if (
      cookies.userData &&
      cookies.isAuthenticated &&
      cookies.jwt &&
      cookies.jwt != "loggedout"
    ) {
      routes = (
        <Switch>
          <Route
            path="/admin"
            render={(props) => (
              <AdminLayout {...props} cookies={this.props.cookies} />
            )}
          />
          <Route
            path="/task/:topicId/:taskId"
            render={(props) => (
              <TaskLayout {...props} cookies={this.props.cookies} />
            )}
          />
          <Route
            path="/auth"
            render={(props) => (
              <AuthLayout {...props} cookies={this.props.cookies} />
            )}
          />
          <Redirect from="/" to="/admin/profile" />
        </Switch>
      );
    }

    return <Auxillary>{routes}</Auxillary>;
  }
}

export default withCookies(ErrorHandler(App, axios));
