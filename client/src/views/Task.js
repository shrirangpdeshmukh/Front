import React, { Component } from "react";
import { Grid } from "react-bootstrap";
import CommentCard from "../components/Cards/CommentCard/CommentCard";
import ChatModal from "../components/Modals/TaskInfoModal/TaskInfoModal";
import ActionModalButtons from "../components/CustomButton/ActionModalButtons/ActionModalButtons";
import axios from "../axios-root";
import io from "socket.io-client";
import { withCookies } from "react-cookie";
import {
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Button,
  Modal,
  ListGroupItem,
  DropdownButton,
  MenuItem,
} from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import TagInput from "../components/TagInput/TagInput";
import checkValidity from "../variables/validityRules";

import { AddAssignment, RemoveAssignment } from "../variables/forms";
import InputElements from "../components/Form/InputElements/InputElements";
import ResponseModal from "../components/Modals/ResponseModal/ResponseModal";

class Chat extends Component {
  socket = null;
  typing = null;
  timeout = undefined;
  state = {
    taskData: null,
    comments: [],

    error: false,
    typing: "",
    showModal: 0,
    updatedTags: [],
    tags: [],
    loading: true,
    addAssignment: AddAssignment,
    removeAssignment: RemoveAssignment,
    formIsValid: false,
    assignees: [],
    assignmentRequests: [],
    requestTracker: [],
    // <<<<<<< Refactoring
    //   };

    //   componentDidMount() {
    //     axios
    //       .get(
    //         `/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/comments/100`
    //       )
    //       .then((response) => {
    //         //console.log(response)
    //         this.setState({ comments: response.data.comments.data });
    //         this.setUpSocket();
    //       })
    //       .catch((err) => this.setState({ error: true, loading: false }));
    //     //console.log(this.props)
    //     axios
    //       .get(`/board/topics/${this.props.topicId}/tasks/${this.props.taskId}`)
    //       .then((response) => {
    //         //console.log(response)
    //         this.setState({ taskData: response.data.task });
    //         if (response.data.task.tags !== null) {
    //           this.setState({
    //             tags: response.data.task.tags,
    //             updatedTags: response.data.task.tags,
    //           });
    //         }

    //         const assignments = [];
    //         if (response.data.task.assignments !== null) {
    //           response.data.task.assignments.forEach((assignment) =>
    //             assignments.push(assignment.email)
    //           );
    //         }
    //         this.setState({ assignees: assignments });
    //       })
    //       .catch((e) => this.setState({ error: true, loading: false }));
    //     axios
    //       .get(
    //         `/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/assignmentRequest`
    //       )
    //       .then((response) => {
    //         // console.log(response)
    //         if (response.data.requests !== null) {
    //           const requestsTracker = [];
    //           response.data.requests.forEach((request) =>
    //             requestsTracker.pushback("notAccepted")
    //           );
    //           this.setState({
    //             assignmentRequests: response.data.requests,
    //             requestTracker: requestsTracker,
    //           });
    // =======
    dropDownValue: "Change Importance",
    isArchived: 0,
    important: 0,
    responseModal: false,
  };

  componentDidMount() {
    axios
      .get(
        `/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/comments/100`
      )
      .then((response) => {
        //console.log(response)
        this.setState({ comments: response.data.comments.data });
        this.setUpSocket();
        axios
          .get(`/board/topics/${this.props.topicId}/tasks/${this.props.taskId}`)
          .then((response) => {
            console.log(response);
            this.setState({
              taskData: response.data.task,
              isArchived: response.data.task.isArchived,
              important: response.data.task.important,
            });
            if (response.data.task.tags !== null) {
              this.setState({
                tags: response.data.task.tags,
                updatedTags: response.data.task.tags,
              });
            }

            const assignments = [];
            if (response.data.task.assignments !== null) {
              response.data.task.assignments.forEach((assignment) =>
                assignments.push(assignment.email)
              );
            }
            this.setState({ assignees: assignments });
            axios
              .get(
                `/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/assignmentRequest`
              )
              .then((response) => {
                // console.log(response)
                if (response.data.requests !== null) {
                  console.log(response.data.requests);
                  const requestsTracker = [];
                  const requests = [];
                  response.data.requests.forEach((request) =>
                    requestsTracker.push("notAccepted")
                  );
                  response.data.requests.forEach((request) =>
                    requests.push(request.email)
                  );
                  this.setState({
                    assignmentRequests: requests,
                    requestTracker: requestsTracker,
                  });
                }
                this.setState({ loading: false });
              })
              // <<<<<<< Refactoring
              //       .catch((err) => this.setState({ error: true }));
              // =======
              .catch((err) => this.setState({ error: true, loading: false }));
          })
          .catch((e) => this.setState({ error: true, loading: false }));
      })
      .catch((err) => this.setState({ error: true, loading: false }));
    //console.log(this.props)
  }

  setUpSocket = () => {
    const token = this.props.cookies.cookies.jwt;
    this.socket = io.connect(`http://localhost:5000`, {
      query: { token },
    });
    this.socket.emit("join", this.props.taskId);
    this.socket.on("display", (data) => this.onDisplay(data));
    this.socket.on("newComment", (newComment) =>
      this.onCommentRecieved(newComment)
    );
  };

  onCommentRecieved = (newComment) => {
    let oldComments = this.state.comments;
    oldComments.push(newComment);

    this.setState({ comments: oldComments });
  };

  onSubmitComment = (e, comment) => {
    e.preventDefault();
    if (comment == "") alert("Empty comment!");
    else {
      const data = {
        user_id: JSON.parse(this.props.cookies.cookies.userData).user.id,
        text: comment,
        task_id: this.props.taskId,
      };
      this.socket.emit("message", data);
      document.getElementById("message").value = "";
    }
  };

  typingTimeout = () => {
    this.typing = false;
    this.socket.emit("typing", {
      user_id: JSON.parse(this.props.cookies.cookies.userData).user.id,
      username: JSON.parse(this.props.cookies.cookies.userData).user.name,
      typing: false,
      task_id: this.props.taskId,
    });
  };

  keypress = (e, comment) => {
    if (e.which != 13) {
      this.typing = true;
      this.socket.emit("typing", {
        user_id: JSON.parse(this.props.cookies.cookies.userData).user.id,
        username: JSON.parse(this.props.cookies.cookies.userData).user.name,
        typing: true,
        task_id: this.props.taskId,
      });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.typingTimeout, 1000);
    } else {
      clearTimeout(this.timeout);
      this.typingTimeout();
      this.onSubmitComment(e, comment);
    }
  };

  onDisplay = (data) => {
    if (
      data.typing == true
      //&& data.user_id != JSON.parse(this.props.cookies.cookies.userData).user.id
    )
      this.setState({ typing: `${data.username} is typing...` });
    else this.setState({ typing: `` });
  };

  hideModals = () => {
    // <<<<<<< Refactoring
    //     this.setState({ showModal: 0 });
    //   };
    // =======
    this.setState({ showModal: 0, dropDownValue: "Change Importance" });
  };

  updatedTagsInState = (tags) => {
    this.setState({ updatedTags: tags });
    console.log(this.state.updatedTags);
  };

  submitUpdatedTags = (updatedTags) => {
    const data = {
      tags: updatedTags,
    };
    axios
      .post(
        `/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/tags/update`,
        data
      )
      .then((response) => {
        this.setState({ tags: updatedTags, showModal: 0 });
      })
      .catch((err) => this.setState({ error: true }));
  };
  onMenuItemClicked = (idx) => {
    this.props.hideModal();
    this.setState({ showModal: idx });
  };

  addAssignmentChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.addAssignment,
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    let formIsValid = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ addAssignment: updatedForm, formIsValid: formIsValid });
  };

  removeAssignmentChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.removeAssignment,
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    let formIsValid = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ removeAssignment: updatedForm, formIsValid: formIsValid });
  };

  onAddAssignees = () => {
    const formData = {};
    for (let formElementIdentifier in this.state.addAssignment) {
      formData[formElementIdentifier] = this.state.addAssignment[
        formElementIdentifier
      ].value;
      // <<<<<<< Refactoring
      //     }
      //     this.setState({ loading: true });
      //     axios
      //       .post(
      //         `/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/assignments`,
      //         formData
      //       )
      //       .then((response) => {
      //         console.log(response);
      //         const addedAssignments = [];
      //         formData.emails
      //           .split(",")
      //           .forEach((email) => addedAssignments.push(email));
      //         console.log(addedAssignments);
      //         this.setState({
      //           assignees: [...this.state.assignees, ...addedAssignments],
      //           showModal: 0,
      //           loading: false,
      //         });
      //         console.log(this.state.assignees);
      // =======
    }
    this.setState({ loading: true });
    axios
      .post(
        `/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/assignments`,
        formData
      )
      .then((response) => {
        console.log(response);
        const addedAssignments = [];
        formData.emails
          .split(",")
          .forEach((email) => addedAssignments.push(email));
        console.log(addedAssignments);
        this.setState({
          assignees: [...this.state.assignees, ...addedAssignments],
          showModal: 0,
          loading: false,
        });
        console.log(this.state.assignees);
        const modalData = {
          title: "Success",
          message: response.data.message,
          Button: "success",
          img: "success",
          hide: () => {
            this.setState({ responseModal: false });
          },
        };
        this.setState({ responseModal: true, modalData: modalData });
      })
      .catch((err) => {
        this.setState({ error: true, loading: false });
      })
      .catch((err) => {
        this.setState({ error: true, loading: false });
      });
  };

  onRemoveAssignees = () => {
    const formData = {};
    for (let formElementIdentifier in this.state.removeAssignment) {
      formData[formElementIdentifier] = this.state.removeAssignment[
        formElementIdentifier
      ].value;
      // <<<<<<< Refactoring
      //     }
      //     this.setState({ loading: true });
      //     axios
      //       .patch(
      //         `/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/assignments`,
      //         formData
      //       )
      //       .then((response) => {
      //         console.log(response);
      //         const updatedAssignments = this.state.assignees.filter(
      //           (assigneeEmail) => assigneeEmail !== formData.email
      //         );
      //         this.setState({
      //           assignees: updatedAssignments,
      //           showModal: 0,
      //           loading: false,
      //         });
      //         console.log(this.state.assignees);
      // =======
    }
    this.setState({ loading: true });
    axios
      .patch(
        `/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/assignments`,
        formData
      )
      .then((response) => {
        console.log(response);
        const updatedAssignments = this.state.assignees.filter(
          (assigneeEmail) => assigneeEmail !== formData.email
        );
        this.setState({
          assignees: updatedAssignments,
          showModal: 0,
          loading: false,
        });
        console.log(this.state.assignees);
        const modalData = {
          title: "Success",
          message: response.data.message,
          Button: "success",
          img: "success",
          hide: () => {
            this.setState({ responseModal: false });
          },
        };
        this.setState({ responseModal: true, modalData: modalData });
      })
      .catch((err) => {
        this.setState({ error: true, loading: false });
      })
      .catch((err) => {
        this.setState({ error: true, loading: false });
      });
  };

  onAcceptRequest = (index) => {
    // <<<<<<< Refactoring
    //     const requestTracker = this.state.requestTracker;
    //     requestTracker[index] = "accepting";
    //     this.setState({ requestTracker: requestTracker });
    //     axios
    //       .patch(
    //         `/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/assignmentRequest`,
    //         { email: this.state.assignmentRequests[index].email }
    //       )
    //       .then((response) => {
    //         const requestTracker = this.state.requestTracker;
    // =======
    const requestTracker = this.state.requestTracker;
    requestTracker[index] = "accepting";
    this.setState({ requestTracker: requestTracker });
    axios
      .patch(
        `/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/assignmentRequest`,
        { email: this.state.assignmentRequests[index] }
      )
      .then((response) => {
        const requestTracker = this.state.requestTracker;

        requestTracker.splice(index, 1);
        const requests = this.state.assignmentRequests;
        requests.splice(index, 1);
        this.setState({
          requestTracker: requestTracker,
          assignmentRequests: requests,
        });

        this.setState({ requestTracker: requestTracker });
      })
      .catch((err) => this.setState({ error: true }));
  };

  onArchive = () => {
    axios
      .patch(
        `/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/archive`,
        { important: this.state.important === 1 ? 1 : 0 }
      )
      .then((response) => {
        this.setState({
          isArchived: 1,
          showModal: 0,
          dropDownValue: "Change Importance",
        });
        const modalData = {
          title: "Success",
          message: response.data.message,
          Button: "success",
          img: "success",
          hide: () => {
            this.setState({ responseModal: false });
          },
        };
        this.setState({ responseModal: true, modalData: modalData });
      })

      .catch((err) => this.setState({ error: true }));
  };

  onRequestAssignment = () => {
    const currentRequests = this.state.assignmentRequests;
    const requestTracker = this.state.requestTracker;
    axios
      .post(
        `/board/topics/${this.props.topicId}/tasks/${this.props.taskId}/assignmentRequest`,
        { email: JSON.parse(this.props.cookies.cookies.userData).user.email }
      )
      .then((response) => {
        currentRequests.push(
          JSON.parse(this.props.cookies.cookies.userData).user.email
        );
        requestTracker.push("notAccepted");
        this.setState({
          assignmentRequests: currentRequests,
          requestTracker: requestTracker,
        });
      })
      .catch((err) => this.setState({ error: true }));
  };

  render() {
    let modal = null;
    if (this.state.loading == false) {
      modal = this.props.modalData ? (
        <ChatModal
          {...this.props}
          show={this.props.modalData}
          onHide={this.props.hideModal}
          taskName={this.props.name}
          // taskCreator="Ranga"
          description={this.props.taskDescription}
          assignedTo={this.state.assignees}
          canRequestAssignment={
            this.state.assignees.indexOf(
              JSON.parse(this.props.cookies.cookies.userData).user.email
            ) === -1 &&
            JSON.parse(this.props.cookies.cookies.userData).user.role !==
              "admin" &&
            JSON.parse(this.props.cookies.cookies.userData).user.role !==
              "superAdmin"
          }
          hasRequestedAssignment={
            this.state.assignmentRequests.indexOf(
              JSON.parse(this.props.cookies.cookies.userData).user.email
            ) !== -1
          }
          onRequestAssignment={this.onRequestAssignment}
          tags={this.state.tags}
          onUpdateTags={() => this.onMenuItemClicked(1)}
          onAddAssignment={() => this.onMenuItemClicked(2)}
          onRemoveAssignment={() => this.onMenuItemClicked(3)}
          onCheckAssignmentRequests={() => this.onMenuItemClicked(4)}
          // <<<<<<< Refactoring
          // =======
          onArchive={() => this.onMenuItemClicked(5)}
          deadline={this.props.taskDeadline}
          isAdmin={
            JSON.parse(this.props.cookies.cookies.userData).user.role ===
              "admin" ||
            JSON.parse(this.props.cookies.cookies.userData).user.role ===
              "superAdmin"
          }
        />
      ) : null;
    }

    let tagsModal = null;

    if (this.state.loading === false) {
      tagsModal = (
        <Modal show={this.state.showModal === 1} onHide={this.hideModals}>
          <Modal.Header closeButton>
            <Modal.Title>Add/Remove Tags</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={8} md={8} sm={10}>
                <TagInput
                  tags={this.state.updatedTags}
                  updateTags={(tags) => this.updatedTagsInState(tags)}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <ActionModalButtons
              //disabled={!this.state.formIsValid}
              submit={() => this.submitUpdatedTags(this.state.updatedTags)}
              cancel={this.hideModals}
              yes="Update"
              no="Cancel"
            />
          </Modal.Footer>
        </Modal>
      );
    }

    let addAssigneesFormData = [];
    for (let key in this.state.addAssignment) {
      addAssigneesFormData.push({
        id: key,
        config: this.state.addAssignment[key],
      });
    }

    let removeAssigneesFormData = [];
    for (let key in this.state.removeAssignment) {
      removeAssigneesFormData.push({
        id: key,
        config: this.state.removeAssignment[key],
      });
    }

    let addAssigneesForm = (
      <form>
        {addAssigneesFormData.map((formElement) => (
          <InputElements
            key={formElement.id}
            element={formElement}
            changeHandler={this.addAssignmentChangedHandler}
          />
        ))}
      </form>
    );

    let removeAssigneesForm = (
      <form>
        {removeAssigneesFormData.map((formElement) => (
          <InputElements
            key={formElement.id}
            element={formElement}
            changeHandler={this.removeAssignmentChangedHandler}
          />
        ))}
      </form>
    );

    let addAssigneesModal = null;
    let removeAssigneesModal = null;
    let checkRequestsModal = null;
    let checkRequestsModalData = null;
    let archiveModal = null;
    if (this.state.loading == false) {
      addAssigneesModal = (
        <Modal show={this.state.showModal === 2} onHide={this.hideModals}>
          <Modal.Header closeButton>
            <Modal.Title>Add Assignees</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={8} md={12} sm={10}>
                {addAssigneesForm}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <ActionModalButtons
              disabled={!this.state.formIsValid}
              submit={this.onAddAssignees}
              cancel={this.hideModals}
              yes="Add"
              no="Cancel"
            />
          </Modal.Footer>
        </Modal>
      );

      removeAssigneesModal = (
        <Modal show={this.state.showModal === 3} onHide={this.hideModals}>
          <Modal.Header closeButton>
            <Modal.Title>Remove Assignee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={8} md={12} sm={10}>
                {removeAssigneesForm}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <ActionModalButtons
              disabled={!this.state.formIsValid}
              submit={this.onRemoveAssignees}
              cancel={this.hideModals}
              yes="Remove"
              no="Cancel"
            />
          </Modal.Footer>
        </Modal>
      );

      if (this.state.assignmentRequests.length === 0) {
        checkRequestsModalData = (
          <div style={{ display: "flex" }}>
            <ListGroupItem>
              No new requests! Check Later.&nbsp;&nbsp;
            </ListGroupItem>
          </div>
        );
      } else {
        // <<<<<<< Refactoring
        //         checkRequestsModalData = this.state.assignmentRequests.map(
        //           (request, index) => {
        //             return (
        //               <div style={{ display: "flex" }}>
        //                 <ListGroupItem>
        //                   {request.email}
        //                   <Button
        //                     pullRight
        //                     bsSize="small"
        //                     disabled={this.state.requestTracker[index] === "accepting"}
        //                     bsStyle="success"
        //                     onClick={() => this.onAcceptRequest(index)}
        //                   >
        //                     {this.state.requestTracker[index] === "notAccepted"
        //                       ? "Accept"
        //                       : "Accepting"}
        //                   </Button>
        //                 </ListGroupItem>
        //               </div>
        //             );
        //           }
        //         );
        // =======
        checkRequestsModalData = this.state.assignmentRequests.map(
          (request, index) => {
            return (
              <div style={{ display: "flex" }}>
                <ListGroupItem style={{ width: "600px" }}>
                  {request}&nbsp;&nbsp;
                </ListGroupItem>
                <Button
                  pullRight
                  bsSize="small"
                  disabled={this.state.requestTracker[index] === "accepting"}
                  bsStyle="success"
                  className="btn-fill"
                  onClick={() => this.onAcceptRequest(index)}
                >
                  {this.state.requestTracker[index] === "notAccepted"
                    ? "Accept"
                    : "Accepting"}
                </Button>
              </div>
            );
          }
        );
      }
      checkRequestsModal = (
        <Modal show={this.state.showModal === 4} onHide={this.hideModals}>
          <Modal.Header closeButton>
            <Modal.Title>Assignment Requests</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col lg={8} md={12} sm={10}>
                {checkRequestsModalData}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <ActionModalButtons
              //disabled={!this.state.formIsValid}
              submit={this.hideModals}
              cancel={this.hideModals}
              yes="Done"
              no="Cancel"
            />
          </Modal.Footer>
        </Modal>
      );

      let taskImportanceOptions = ["Important", "Not Important"];

      archiveModal = (
        <Modal
          show={this.state.showModal === 5}
          onHide={this.hideModals}
          bsSize="small"
        >
          <Modal.Header closeButton>
            <Modal.Title>Archive Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid fluid>
              <p>
                <b style={{ fontSize: "1.2em" }}>Archived Status:</b> &nbsp;{" "}
                {this.state.isArchived ? "Archived" : "Not Archived"}
                <br />
                <b style={{ fontSize: "1.2em" }}>
                  Importance Status:
                </b> &nbsp;{" "}
                {this.state.important ? "Important" : "Not important"}{" "}
              </p>

              <br />
              <br />
              {!this.state.isArchived ? (
                <DropdownButton
                  bsStyle="primary"
                  title={this.state.dropDownValue}
                  className="btn-fill"
                  id="task-importance"
                >
                  <MenuItem
                    eventKey={taskImportanceOptions[0]}
                    onClick={() =>
                      this.setState({
                        dropDownValue: taskImportanceOptions[0],
                        important: 1,
                      })
                    }
                  >
                    {taskImportanceOptions[0]}
                  </MenuItem>
                  <MenuItem
                    eventKey={taskImportanceOptions[1]}
                    onClick={() =>
                      this.setState({
                        dropDownValue: taskImportanceOptions[1],
                        important: 0,
                      })
                    }
                  >
                    {taskImportanceOptions[1]}
                  </MenuItem>
                </DropdownButton>
              ) : null}
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <ActionModalButtons
              disabled={
                this.state.dropDownValue == "Change Importance" ||
                this.state.isArchived === 1
              }
              submit={this.onArchive}
              cancel={this.hideModals}
              yes="Archive"
              no="Cancel"
            />
          </Modal.Footer>
        </Modal>
      );
    }

    let chat = null;
    if (this.state.comments.length) {
      chat = this.state.comments.map((comment) => {
        let date = new Date(parseInt(comment.timestamp))
          .toString()
          .split("GMT")[0];
        return (
          <CommentCard
            key={parseInt(comment.id)}
            title={JSON.parse(this.props.cookies.cookies.userData).user.name}
            userLink={`/admin/user/${
              JSON.parse(this.props.cookies.cookies.userData).user.id
            }`}
            stats={date}
            content={comment.text}
          />
        );
      });
    } else chat = <h5>No messages on this task yet !!</h5>;

    let responseModal = null;
    if (this.state.modalData)
      responseModal = (
        <ResponseModal
          show={this.state.responseModal}
          onHide={this.state.modalData.hide}
          title={this.state.modalData.title}
          body={this.state.modalData.message}
          button={this.state.modalData.Button}
          img={this.state.modalData.img}
        />
      );

    return (
      <div
        className="content"
        style={{
          position: " relative",
          minHeight: "100vh",
          fontSize: "1.1em",
        }}
      >
        <Grid style={{ paddingBottom: "30px" }}>
          {modal}
          {tagsModal}
          {addAssigneesModal}
          {removeAssigneesModal}
          {checkRequestsModal}
          {archiveModal}
          {responseModal}
          {chat}

          {/* chat input */}
          <Row style={{ marginTop: "15px" }}>
            <p>{this.state.typing}</p>
            <Form>
              <Col
                lg={10}
                md={8}
                xs={10}
                style={{
                  paddingRight: "2px",
                }}
              >
                <FormGroup
                  //controlId="formInlineName"
                  style={{ border: "1px solid #ccc", borderRadius: "4px" }}
                >
                  <FormControl
                    onKeyPress={(e) =>
                      this.keypress(e, document.getElementById("message").value)
                    }
                    autoComplete="off"
                    type="text"
                    placeholder="Write Your Message"
                    id="message"
                  />
                </FormGroup>{" "}
              </Col>
              <Col lg={1} md={4} xs={2}>
                <Button
                  pullRight
                  onClick={(e) =>
                    this.onSubmitComment(
                      e,
                      document.getElementById("message").value
                    )
                  }
                  style={{ border: "0", marginLeft: "-15px" }}
                >
                  <IoIosSend style={{ padding: "0", fontSize: "1.8em" }} />
                </Button>
              </Col>
            </Form>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withCookies(Chat);
