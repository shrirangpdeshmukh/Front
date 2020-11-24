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

import { Button, ButtonGroup } from "react-bootstrap";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

export class Card extends Component {
  render() {
    let editOption = null;
    if (this.props.topicEdit) {
      editOption = (
        <div
          style={{
            float: "right",
            marginRight: "3%",
            zIndex: "1000",
            marginTop: "5%",
          }}
        >
          <ButtonGroup>
            <Button
              style={{ border: "none", size: "1.2em" }}
              onClick={this.props.topicEditLink}
            >
              <BiEditAlt style={{ height: "1.6em", width: "1.6em" }} />
            </Button>
            <Button
              style={{ border: "none", size: "1.2em" }}
              onClick={this.props.archiveEdit}
            >
              <AiOutlineDelete style={{ height: "1.6em", width: "1.6em" }} />
            </Button>
          </ButtonGroup>
        </div>
      );
    }

    return (
      <div
        className={"card" + (this.props.plain ? " card-plain" : "")}
        style={this.props.style}
      >
        {editOption}
        <div
          className={"header" + (this.props.hCenter ? " bold text-center" : "")}
        >
          <h4
            onClick={this.props.toChat}
            className="title"
            style={
              this.props.topicCard
                ? {
                    cursor: "pointer",
                    fontSize: "2em",
                    textDecoration: "underline",
                    textUnderlineOffset: "0.5em",
                    margin: "10px",
                  }
                : null
            }
          >
            {this.props.title}
          </h4>

          <div className="category">{this.props.category} </div>
        </div>

        <div
          className={
            "content" +
            (this.props.ctAllIcons ? " all-icons" : "") +
            (this.props.ctTableFullWidth ? " table-full-width" : "") +
            (this.props.ctTableResponsive ? " table-responsive" : "") +
            (this.props.ctTableUpgrade ? " table-upgrade" : "")
          }
        >
          {this.props.content}

          <div className="footer">
            {this.props.legend}
            {this.props.stats != null ? <hr /> : ""}
            <div className="stats">
              <i className={this.props.statsIcon} /> {this.props.stats}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
