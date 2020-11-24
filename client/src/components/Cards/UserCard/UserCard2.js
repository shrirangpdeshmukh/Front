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
import styles from "./UserCard2.module.css";
// import { FaHashtag } from "react-icons/fa";

export class UserCard extends Component {
  componentDidMount() {
    const name = this.props.name;
    const names = name.split(" ");

    let displayName = names[0].charAt(0).toUpperCase();
    if (names[1] != null || names[1] !== undefined) {
      displayName = displayName + names[1].charAt(0).toUpperCase();
    }

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.font = "60px Roboto";
    ctx.textAlign = "center";
    // ctx.fontColor="orange";
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", " white");
    ctx.fillStyle = gradient;
    ctx.fillText(displayName, canvas.width / 2, canvas.height / 1.5);
  }
  render() {
    const bio = (
      <div className={styles.insta_bio}>
        <p>
          <b>
            <u>Bio:</u>
          </b>
        </p>
        <br />
        <p>{this.props.bio ? this.props.bio : "No bio added yet"}</p>
      </div>
    );

    let rank = null;

    if (this.props.rank) {
      rank = (
        <div className={styles.insta_follow}>
          <h2>
            {this.props.rank}
            <span>Rank</span>
          </h2>
        </div>
      );
    }

    let points = null;

    if (this.props.points) {
      points = (
        <div className={styles.insta_follow}>
          <h2>
            {this.props.points}
            <span>Points</span>
          </h2>
        </div>
      );
    }

    let role = this.props.role;
    if (role === "superAdmin") role = "Super Admin";
    else role = role.charAt(0).toUpperCase() + role.slice(1);

    let designation = this.props.designation;
    designation = designation.charAt(0).toUpperCase() + designation.slice(1);

    return (
      <div className={styles.insta_main}>
        <div className={styles.insta_wrapper}>
          <div className={styles.insta_banner}>
            <canvas
              width="320"
              height="150"
              style={{ backgroundColor: "whitesmoke" }}
            ></canvas>
          </div>
          <div className={styles.insta_details}>
            <div className={styles.insta_dp}>
              <canvas
                ref="canvas"
                width="150"
                height="150"
                style={{ backgroundColor: "#302B54" }}
                id="Name"
              ></canvas>
            </div>
            <div className={styles.button}>{this.props.dropdown}</div>
            <div className={styles.insta_name}>
              <h2>
                <br />
                {this.props.name} <span>{this.props.email}</span>
              </h2>
            </div>
            <div className={styles.insta_followers_wrap}>
              {rank}
              {points}
            </div>

            <div>
              <div className={styles.insta_followers_wrap}>
                <div className={styles.insta_follow}>
                  <h2>
                    <span>Role</span>
                    <br />
                    {role}
                  </h2>
                </div>
                <div className={styles.insta_follow}>
                  <h2>
                    <span>Designation</span>
                    <br />
                    {designation}
                  </h2>
                </div>
              </div>
            </div>

            {bio}
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
