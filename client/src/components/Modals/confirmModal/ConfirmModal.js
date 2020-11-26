import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

class ConfirmModal extends Component {
  state = {
    show: this.props.show,
  };
  handleClose = () => {
    this.setState({ show: false });
    this.props.closeClicked();
  };
  render() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <b>{this.props.Heading}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflow: "hidden" }}>
          {this.props.Body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={this.props.onContinue}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmModal;
