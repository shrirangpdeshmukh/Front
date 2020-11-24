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
import React from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "../Cards/Card/Card";

const pointsTable = (props) => {
  const title = (
    <div className="container">
      <Col xs={12} md={8} sm={10}>
        <h3 className="pull-left" style={{ fontWeight: "bold" }}>
          Point Transaction Table
        </h3>
      </Col>
    </div>
  );

  const headings = ["Points", "Awarded By", "Awarded at", "Reason"];

  const content = (
    <Table striped hover>
      <thead>
        <tr>
          {headings.map((prop, key) => {
            return <th key={key}>{prop}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.details.map((prop, key) => {
          let date = new Date(parseInt(prop.awarded_at))
            .toString()
            .split("GMT")[0];
          return (
            <tr key={key}>
              <td>{prop.points_awarded}</td>
              <td>{prop.name}</td>
              <td>{date}</td>
              <td>{prop.reason}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title={title}
              ctTableFullWidth
              ctTableResponsive
              content={content}
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default pointsTable;
