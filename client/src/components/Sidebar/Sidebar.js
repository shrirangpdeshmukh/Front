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
import { NavLink } from "react-router-dom";

import logo from "../../assets/img/collegelogo.png";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
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

    let routes = this.props.routes.map((prop, key) => {
      if (prop.path === "/signup" && !renderFlag) return null;

      if (!prop.redirect && prop.icon && prop.name)
        return (
          <li className={this.activeRoute(prop.layout + prop.path)} key={key}>
            <NavLink
              to={prop.layout + prop.path}
              className="nav-link"
              activeClassName="active"
            >
              <i className={prop.icon} />
              <p>{prop.name}</p>
            </NavLink>
          </li>
        );
      return null;
    });

    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color={this.props.color}
        data-image={this.props.image}
      >
        <div className="logo">
          <a href="/" className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a href="/" className="simple-text logo-normal">
            Neuromancers
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">{routes}</ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
