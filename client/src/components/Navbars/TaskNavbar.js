import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { BsInfoCircleFill } from "react-icons/bs";

import AdminNavbarLinks from "./AdminNavbarLinks";

class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false,
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true,
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function () {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }
  render() {
    return (
      <Navbar fixed="top" fluid>
        <Navbar.Header>
          <Navbar.Brand>
            {this.props.brandText}
            &nbsp;&nbsp;
            <BsInfoCircleFill onClick={this.props.infoCallback} style={{zIndex:"1000000000"}}/>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <AdminNavbarLinks cookies={this.props.cookies}/>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
