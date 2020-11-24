/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import AdminNavbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

import { adminRoutes } from "../routes.js";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      // image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open",
    };
  }
  handleNotificationClick = (position) => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    return level;
  };
  getRoutes = (adminRoutes) => {
    let renderFlag = false;

    const cookies = this.props.cookies.cookies;

    const auth = cookies.isAuthenticated;
    const userData = cookies.userData;

    if (auth && userData && userData !== "undefined") {
      const authJSON = JSON.parse(auth);
      const userDataJSON = JSON.parse(userData);

      if (authJSON && userDataJSON) {
        const userRole = userDataJSON.user.role;

        if (userRole === "admin" || userRole === "superAdmin") {
          renderFlag = true;
        }
      }
    }

    let routes = adminRoutes.map((prop, key) => {
      if (prop.layout === "/admin") {
        if (prop.path === "/signup" && !renderFlag) return null;

        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
                cookies={this.props.cookies}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });

    return routes;
  };
  getBrandText = (path) => {
    for (let i = 0; i < adminRoutes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          adminRoutes[i].layout + adminRoutes[i].path
        ) !== -1
      ) {
        return adminRoutes[i].name;
      } else if (this.props.location.pathname.includes("/admin/user")) {
        return "User Profile";
      }
    }
    return "Brand";
  };

  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div style={{ position: " relative" }}>
        <Sidebar {...this.props} routes={adminRoutes} />
        <div
          id="main-panel"
          className="main-panel"
          ref="mainPanel"
          styles={{ paddingBottom: "2.5rem" }}
        >
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>{this.getRoutes(adminRoutes)}</Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Admin;
