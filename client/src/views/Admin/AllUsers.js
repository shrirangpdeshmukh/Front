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
import {
  Grid,
  Row,
  Col,
  ListGroupItem,
  ListGroup,
  Badge,
} from "react-bootstrap";

import axios from "../../axios-root";

import Card from "../../components/Cards/Card/Card";
// import CustomButton from "../../components/CustomButton/CustomButton";
import Spinner from "../../components/Spinner/Spinner";

class AllUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get("/users/allUsers")
      .then((response) => {
        this.setState({ loading: false, users: response.data.users });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  }

  roleCards = (heading, role) => {
    return (
      <Card
        title={heading}
        hCenter
        content={
          <div>
            <hr></hr>
            <ListGroup>
              {this.state.users.map((user) => {
                if (user.role === role) {
                  return (
                    <ListGroupItem
                      key={user.id}
                      onClick={() =>
                        this.props.history.push(`/admin/user/${user.id}`)
                      }
                      style={{
                        borderTop: 0,
                        borderRight: 0,
                        borderLeft: 0,
                        fontSize: 20,
                      }}
                    >
                      {user.name}
                      <Badge>{user.designation}</Badge>
                    </ListGroupItem>
                  );
                } else return null;
              })}
            </ListGroup>
          </div>
        }
      />
    );
  };

  render() {
    let data = null;

    if (this.state.loading) {
      data = <Spinner />;
    }

    if (this.state.users.length !== 0) {
      data = (
        <Grid fluid>
          <Row>
            <Col md={12}>
              {this.roleCards("Super Admins", "superAdmin")}
              {this.roleCards("Admins", "admin")}
              {this.roleCards("Members", "user")}
            </Col>
          </Row>
        </Grid>
      );
    }

    return <div className="content">{data};</div>;
  }
}

export default AllUsers;
