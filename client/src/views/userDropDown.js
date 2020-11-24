import React, { Component } from "react";
import styles from './styles/userDropDown.module.css';

export class userDropDown extends Component {
    render() {
        
        return(
            <div className = {styles.dropdown}>
            <button className ={styles.dropbtn}>{this.props.title}</button>
            <div className={styles.dropdown_content}>
                <a href="/" onClick = {this.props.blacklistUserClicked}>Blacklist</a>
                <a href="/">change designation</a>
                <a href="/">change role</a>
                <a href="/" onClick = {this.props.deleteUserClicked}>delete user</a>
                <a href="/">award points</a>
            </div>
            </div>
        )
    }
};

export default userDropDown;