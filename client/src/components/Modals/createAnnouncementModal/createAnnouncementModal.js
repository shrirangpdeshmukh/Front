import React, {Component} from "react";

import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    Button,
    Form,
    FormGroup,
    // FormLabel
} from "react-bootstrap";
import styles from "./createAnnouncementModal.module.css";

class createAnnouncement extends Component {

        state = {
            show : this.props.show,
            announcement : null
        }
        handleClose = () => {
            this.setState({show:false})
            this.props.onClose();
        }
       
        
    
        render() {
            let form = (
                <div className = {styles.FormBody}>
                    <form className = {styles.Form}>
                        <h5><b>Enter your announcement below</b></h5>
                        <hr />
                        <textarea type = "textarea" className = {styles.TextArea} placeholder = "Enter the body of the announcement" 
                            id = "textarea" > </textarea>
                    </form>
                </div>
            )
        
            return(
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <ModalHeader closeButton>
                    <ModalTitle>Create an Announcement</ModalTitle>
                    </ModalHeader>
                    
                     {form}   
                    
                    <ModalFooter>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.props.create}>
                        Create
                    </Button>
                    </ModalFooter>
                </Modal>
            );
        }
}

export default createAnnouncement;