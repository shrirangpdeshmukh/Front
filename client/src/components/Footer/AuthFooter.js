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
          maxHeight: "0.2rem",
        }}
      >
        <Grid fluid style={{ marginTop: "15px" }}>
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
