import React, { Component } from "react";
import { Nav, NavDropdown, MenuItem } from "react-bootstrap";

import {adminRoutes} from "../../routes";

class AdminSidebarLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  render() {
        
    let renderFlag =false;
    
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
        }}}

    
    let drop = adminRoutes.map((route) => {
      
      if (!route.name || !route.icon) return null;
      else if (route.path ==="/signup" && !renderFlag) return null;
      return (
        <MenuItem key={route.path} href={`${route.layout}${route.path}`}>
          <i className={route.icon} /> {route.name}
        </MenuItem>
      );
    });
    
    const DropDown = (
      <Nav>
        <NavDropdown eventKey={2} title="MENU" id="basic-nav-dropdown-right">
          {drop}
        </NavDropdown>
      </Nav>
    );
    return DropDown;
  }
}

export default AdminSidebarLinks;
