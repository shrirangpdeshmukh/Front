import React from 'react';
import classes from './Backdrop.module.css'


const backdrop = (props) => (
    (props.show === 1) ? <div className = {classes.Backdrop} onClick={props.clicked}></div>: null
)

export default backdrop;