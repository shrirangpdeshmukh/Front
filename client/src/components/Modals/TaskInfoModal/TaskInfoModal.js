import React, { Component } from "react";

import {
  Modal,
  Image,
  DropdownButton,
  Dropdown,
  MenuItem,
  Label,
  Button,
} from "react-bootstrap";
import { BiEditAlt } from "react-icons/bi";

import img from "../../../assets/img/details.png";
class ChatModal extends Component {
  state = { width: window.innerWidth };

  render() {
    const p_styles = {
      textAlign: "left",
      display: "inline-block",
      height: "60%",
      width: "60%",
    };
    const figure_styles = {
      float: "right",
      display: "inline-block",

      height: "40%",
      marginTop: "-50px",
      width: "40%",

      //       height: "30%",
      //       marginTop: "-50px",
      //       width: "30%",
    };

    let taskDropdown = null;
    if (this.props.isAdmin) {
      taskDropdown = (
        <Dropdown title="Action" dropup pullRight style={{ float: "right" }}>
          <Dropdown.Toggle noCaret style={{ border: "none" }}>
            <BiEditAlt />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <MenuItem key={1} eventKey={1} onClick={this.props.onUpdateTags}>
              Add/Remove Tag
            </MenuItem>
            <MenuItem key={2} eventKey={2} onClick={this.props.onAddAssignment}>
              Add Assignment
            </MenuItem>
            <MenuItem
              key={3}
              eventKey={3}
              onClick={this.props.onRemoveAssignment}
            >
              Remove Assignment
            </MenuItem>
            <MenuItem
              key={4}
              eventKey={4}
              onClick={this.props.onCheckAssignmentRequests}
            >
              Check Assignment Requests
            </MenuItem>
            <MenuItem divider />

            <MenuItem eventKey="5" onClick={this.props.onArchive}>
              Archive
            </MenuItem>
          </Dropdown.Menu>
        </Dropdown>
      );

      //       taskDropdown=(
      //             <DropdownButton
      //               bsStyle="success"
      //               title="Admin Actions"
      //               className="btn-fill"
      //           id="admin-actions"

      //             >

      //         <MenuItem
      //                     key={1}
      //                     eventKey={1}
      //                    onClick={this.props.onUpdateTags}
      //                   >
      //           Add/Remove Tag
      //                   </MenuItem>
      //         <MenuItem
      //                     key={2}
      //                     eventKey={2}
      //                    onClick={this.props.onAddAssignment}
      //                   >

      //           Add Assignment
      //                   </MenuItem>
      //         <MenuItem
      //                     key={3}
      //                     eventKey={3}
      //                    onClick={this.props.onRemoveAssignment}
      //                   >
      //           Remove Assignment
      //                   </MenuItem>
      //         <MenuItem
      //                     key={4}
      //                     eventKey={4}
      //                    onClick={this.props.onCheckAssignmentRequests}
      //                   >
      //                     Check Assignment Requests
      //                   </MenuItem>
      //               <MenuItem divider />

      //                 <MenuItem
      //                   eventKey="5"
      //                   onClick={this.props.onArchive}
      //                 >
      //                    Archive
      //                 </MenuItem>

      //             </DropdownButton>
      //           );
    }

    let tags = null;
    if (this.props.tags !== null) {
      tags = this.props.tags.map((tag) => {
        return (
          <li>
            <Label bsStyle="primary">{tag}</Label>
          </li>
        );
      });
    }

    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-lg"
            style={{ float: "left", display: "inline-block" }}
          >
            Task Details
            {taskDropdown}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={this.state.width < 991 ? null : p_styles}>
            <strong>Task Name </strong>:&nbsp;{this.props.taskName}
            <br />
            <strong>Description</strong>:&nbsp;&nbsp;
            {this.props.description}
            <br />
            <strong>Assigned to</strong>:&nbsp;
            <ul>
              {this.props.assignedTo.map((assigned) => {
                return <li>{assigned}</li>;
              })}
            </ul>
            {this.props.canRequestAssignment ? (
              <Button
                onClick={this.props.onRequestAssignment}
                bsSize="small"
                className="btn-fill"
                bsStyle="primary"
                disabled={this.props.hasRequestedAssignment}
              >
                {this.props.hasRequestedAssignment
                  ? "Requested"
                  : "Request Assignmnet"}
              </Button>
            ) : null}
            <br />
            <strong>Tags</strong>:&nbsp;
            <ul>{tags}</ul>
            <br />
            <br /> <br />
            <strong>Deadline</strong>:&nbsp; {this.props.deadline}
          </p>

          {this.state.width < 991 ? null : (
            <Image src={img} style={figure_styles} />
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

export default ChatModal;
