import React, { Component } from "react";

class TableAbsentCard extends Component {
  state = {
    style: {
      width: "28rem",
      display: "block",
      border: "1px solid black",
      boxShadow: "5px 10px #888888",
      boxSizing: "border-box",
    },
  };
  componentWillMount() {
    let newStyle = {
      width: "75%",
      display: "block",
      border: "1px solid black",
      boxShadow: "5px 10px #888888",
      boxSizing: "border-box",
    };
    let width = window.innerWidth * 1;
    if (width > 549) {
      console.log(window.innerWidth);
      this.setState({ style: newStyle });
    }
  }
  render() {
    return (
      <div>
        <div style={this.state.style}>
          <div
            style={{
              margin: "3rem",
              textAlign: "left",
            }}
          >
            <h3>
              <b>
                <u>Note</u>
              </b>
            </h3>

            <h4>
              Either the point transaction has not started or the user's point
              tracking is set to off
            </h4>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default TableAbsentCard;
