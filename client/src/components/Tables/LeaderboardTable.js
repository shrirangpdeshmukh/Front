import React from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "../Cards/Card/Card";

const updownArrow = (num) => {
  if (num < 0) {
    return (
      <i
        className="fa fa-angle-up"
        style={{ color: "green", fontSize: "1.5em" }}
      />
    );
  } else if (num > 0) {
    return (
      <i
        className="fa fa-angle-down"
        style={{ color: "red", fontSize: "1.5em" }}
      />
    );
  } else {
    return (
      <i className="fa fa-minus" style={{ color: "blue", fontSize: "0.9em" }} />
    );
  }
};

const leaderbaordTable = (props) => {
  const thArray = [
    "ID",
    "Name",
    "Points",
    "Current Rank",
    "Previous Rank",
    "Change",
  ];

  const title = (
    <div className="container">
      <Col xs={12} md={8} sm={10}>
        <h3 className="pull-left" style={{ fontWeight: "bold" }}>
          Current Leaderboard
        </h3>
      </Col>
    </div>
  );

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title={title}
              category={props.category}
              ctTableFullWidth
              ctTableResponsive
              content={
                <Table striped hover>
                  <thead>
                    <tr>
                      {thArray.map((prop, key) => {
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {props.board.map((prop, key) => {
                      if (!prop.current_rank) return null;

                      return (
                        <tr key={key} onClick={() => props.userLink(prop.id)}>
                          <td>{prop.id}</td>
                          <td>{prop.name}</td>
                          <td>{prop.points}</td>
                          <td>{prop.current_rank}</td>
                          <td>{prop.old_rank}</td>
                          <td>
                            {updownArrow(prop.current_rank - prop.old_rank)}
                            {Math.abs(prop.current_rank - prop.old_rank)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default leaderbaordTable;
