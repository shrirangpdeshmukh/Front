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
import { NavItem, Nav } from "react-bootstrap";

import {adminRoutes} from "../../routes";

class AdminNavbarLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  render() {   
    let renderFlag=false;
    const cookies = this.props.cookies.cookies;

    const auth = cookies.isAuthenticated;
    const userData = cookies.userData;

    if (auth && userData && userData !== "undefined") {
      const authJSON = JSON.parse(auth);
      const userDataJSON = JSON.parse(userData);

      if (authJSON && userDataJSON) {
        const userRole = userDataJSON.user.role;

        if (userRole === "admin" || userRole === "superAdmin") {
          renderFlag=true;
        }}}
    
    
    
    let nav = adminRoutes.map((route) => {
      
      if (!route.name || !route.icon ) return null;
      else if (route.path==="/signup" && !renderFlag) return null;
      
      return (
        <NavItem key={route.path} href={`${route.layout}${route.path}`}>
          <i
            className={route.icon}
            style={{ padding: "2px", fontSize: "1.2em", fontWeight: "bolder" }}
          />
          <span style={{ padding: "3px", fontWeight: "bold" }}>
            {route.name}
          </span>
        </NavItem>
      );
    });
    
    

    const Navigation = <Nav pullRight>{nav}</Nav>;

    return Navigation;
  }
}

export default AdminNavbarLinks;
