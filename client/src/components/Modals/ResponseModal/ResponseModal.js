import React, { Component } from "react";

import Auxillary from "../../../hoc/Auxillary/Auxillary";

import { Modal, Button, Image } from "react-bootstrap";

import mail_sent from "../../../assets/img/mail_sent.png";
import network_error from "../../../assets/img/network_error.png";
import success from "../../../assets/img/success.png";
// import wrong_token from "../../../assets/img/wrong_token.jpg";
import unauthorized from "../../../assets/img/unauthorized.png";

class ResponseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  render() {
    const p_styles = {
      textAlign: "left",
      display: "inline-block",
      padding: "8%",
      wordWrap: "break-word",
      width: "60%",
      height: "60%",
    };
    const figure_styles = {
      float: "right",
      width: "40%",
      height: "40%",
      display: "inline-block",
    };

    let img = null;

    if (this.props.img) {
      switch (this.props.img) {
        case "success": {
          img = success;
          break;
        }
        case "mail": {
          img = mail_sent;
          break;
        }
        case "net_error": {
          img = network_error;
          break;
        }
        case "unauthorized": {
          img = unauthorized;
          break;
        }
        default:
          img = null;
      }
    }

    const figure =
      this.state.width < 991 ? null : <Image src={img} style={figure_styles} />;

    const modalBody = (
      <Auxillary>
        <p style={this.state.width < 991 ? null : p_styles}>
          {this.props.body}
        </p>
        {figure}
      </Auxillary>
    );

    const modal = (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-fill"
            onClick={this.props.onHide}
            bsStyle={this.props.button}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );

    return modal;
  }
}

export default ResponseModal;
