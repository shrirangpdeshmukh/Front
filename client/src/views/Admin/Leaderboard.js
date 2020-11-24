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
import { Col } from "react-bootstrap";

import Button from "../../components/CustomButton/CustomButton";
import LeaderboardTable from "../../components/Tables/LeaderboardTable";

import axios from "../../axios-root";

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = { board: [] };
  }
  componentDidMount() {
    axios
      .get("/board/leaderboard/")
      .then((response) => {
        this.setState({ board: response.data.board });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  refresh = () => {
    axios
      .patch("/board/leaderboard/refresh", { withCredentials: true })
      .then((response) => {
        axios
          .get("/board/leaderboard/")
          .then((response) => {
            console.log(response);
            this.setState({ board: response.data.board });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  userLink = (id) => {
    this.props.history.push(`/admin/user/${id}`);
  };

  render() {
    let category = null;
    const cookies = this.props.cookies.cookies;

    const auth = cookies.isAuthenticated;
    const userData = cookies.userData;

    if (auth && userData && userData !== "undefined") {
      const authJSON = JSON.parse(auth);
      const userDataJSON = JSON.parse(userData);

      if (authJSON && userDataJSON) {
        const userRole = userDataJSON.user.role;

        if (userRole === "admin" || userRole === "superAdmin") {
          category = (
            <div className="container">
              <Col xs={12} md={4} sm={2}>
                <Button simple onClick={this.refresh}>
                  <span>Refresh Leaderboard &nbsp;</span>

                  <i
                    className="pe pe-7s-refresh"
                    style={{
                      color: "black",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                  />
                </Button>
              </Col>
            </div>
          );
        }
      }
    }

    return (
      <LeaderboardTable
        board={this.state.board}
        category={category}
        userLink={this.userLink}
      />
    );
  }
}

export default TableList;
