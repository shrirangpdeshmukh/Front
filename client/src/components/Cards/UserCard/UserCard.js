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
import styles from "./UserCard.module.css";
import { FaHashtag } from "react-icons/fa";

export class UserCard extends Component {
  render() {
    return (
      <div className="card card-user">
        <div className={styles.Rank}>
          {/* <p><FaHashtag className = {styles.Hash}/> 1</p> */}
          <p>
            {" "}
            <span className={styles.Hash}>#</span> {this.props.rank}
          </p>
        </div>

        <div className="image"></div>
        <div className="content">
          <div className="author">
            <a href="#pablo">
              {/* <img
                className="avatar border-gray"
                src={this.props.avatar}
                alt="..."
              /> */}
              {/* <div className="image"></div> */}
              <h4 className="title">
                {this.props.name}
                <br />
                <small>{this.props.email}</small>
              </h4>
            </a>
          </div>
          <hr></hr>
          <p className="description text-center">{this.props.bio}</p>
        </div>
        <hr />
        <div className="text-center">{this.props.socials}</div>
      </div>
    );
  }
}

export default UserCard;
