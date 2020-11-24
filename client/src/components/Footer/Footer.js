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
import { Grid } from "react-bootstrap";
import Button from "../CustomButton/CustomButton";

class Footer extends Component {
  render() {
    return (
      <footer
        className="footer"
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          maxHeight: "2.5rem",
        }}
      >
        <Grid fluid>
          <p className="copyright pull-left">
            &copy; {new Date().getFullYear()} Neuromancers, IITBBS, made with
            &hearts; for the college.
          </p>

          <nav className="pull-right">
            <Button simple>
              <a
                href="https://github.com/NeuromancersIITBBS"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-github fa-2x" style={{ color: "black" }} />
              </a>
            </Button>

            <Button simple>
              <a
                href="https://www.instagram.com/neuro_iitbbs/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa fa-instagram fa-2x"
                  style={{ color: "black" }}
                />
              </a>
            </Button>

            <Button simple>
              <a
                href="https://www.facebook.com/neuroIITBBS/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i
                  className="fa fa-facebook-square fa-2x"
                  style={{ color: "black" }}
                />
              </a>
            </Button>
          </nav>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
