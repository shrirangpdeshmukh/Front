import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Button,
  Modal,
  DropdownButton,
  MenuItem,
} from "react-bootstrap";

import { Card } from "../../components/Cards/Card/Card";
import axios from "../../axios-root";
import { AiFillPlusCircle } from "react-icons/ai";
import ActionModalButtons from "../../components/CustomButton/ActionModalButtons/ActionModalButtons";
import ResponseModal from "../../components/Modals/ResponseModal/ResponseModal";
import checkValidity from "../../variables/validityRules";
import InputElements from "../../components/Form/InputElements/InputElements";
import { CreateTopic } from "../../variables/forms";

class Topics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: null,
      error: null,
      updatedTime: null,
      userData: null,
      editTopic: null,
      formIsValid: true,
      showModal: false,
      showResponse: false,
      loading: false,
      editTicked: false,
      editDropDownTitle: "Scope",
      editDropDownValue: null,
      currentEditingTopic: null,
      createTopic: CreateTopic,
      showCreate: false,
      createDropDownTitle: "Scope",
      createDropDownValue: null,
      createFormIsValid: false,
      createTicked: false,
      showArchive: false,
      archiveImportantTicked: false,
    };
  }
  componentDidMount() {
    axios
      .get(`/board/topics/`)
      .then((response) => {
        console.log(response.data.topics);
        console.log(this.props);
        this.setState({
          topics: response.data.topics,
          updatedTime: Date.now(),
        });
      })
      .catch((err) => this.setState({ error: true }));
  }

  editInputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.editTopic,
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

    this.setState({ editTopic: updatedForm, formIsValid: formIsValid });
  };

  createInputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.createTopic,
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

    this.setState({ createTopic: updatedForm, createFormIsValid: formIsValid });
  };

  getTopicDetails = (id) => {
    this.setState({ showModal: true });
    axios
      .get(`/board/topics/${id}`)
      .then((response) => {
        // console.log(response.data.topic);
        const res = response.data.topic;

        const updatedForm = {
          heading: {
            elementType: "input",
            elementConfig: {
              type: "text",
              id: "edit",
              placeholder: "Topic Heading",
            },
            value: null,
            default: "",
            icon: "points",
            validation: {
              required: true,
            },
            valid: true,
            touched: true,
          },

          description: {
            elementType: "input",
            elementConfig: {
              type: "text",
              id: "description",
              placeholder: "Topic Description",
            },
            value: null,
            default: "",
            icon: "reason",
            validation: {
              required: true,
            },

            valid: true,
            touched: true,
          },
        };

        updatedForm.heading.value = res.heading;
        updatedForm.heading.default = res.heading;
        updatedForm.description.value = res.description;
        updatedForm.description.default = res.description;

        let dropDownUpdate;
        if (res.scope === "superAdmin") {
          dropDownUpdate = { title: "Super Admins Only", value: res.scope };
        } else if (res.scope === "admin") {
          dropDownUpdate = { title: "Admin Only", value: res.scope };
        } else if (res.scope === "member") {
          dropDownUpdate = { title: "All Members", value: res.scope };
        } else if (res.scope === "private") {
          dropDownUpdate = { title: "Private Members", value: res.scope };
        }
        let imp = false;
        if (res.important == 1) imp = true;

        this.setState({
          editTopic: updatedForm,
          editDropDownTitle: dropDownUpdate.title,
          editDropDownValue: dropDownUpdate.value,
          currentEditingTopic: res.id,
          editTicked: imp,
        });
      })
      .catch((error) => console.log(error));
  };

  archiveTicks = (id) => {
    this.setState({ showArchive: true });
    axios
      .get(`/board/topics/${id}`)
      .then((response) => {
        const res = response.data.topic;

        let imp = false;
        if (res.important == 1) imp = true;

        this.setState({
          currentEditingTopic: res.id,
          archiveImportantTicked: imp,
        });
      })
      .catch((error) => console.log(error));
  };

  editTopicHandler = (event) => {
    event.preventDefault();
    this.setState({ showModal: false, loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.editTopic) {
      formData[formElementIdentifier] = this.state.editTopic[
        formElementIdentifier
      ].value;
    }
    formData.scope = this.state.editDropDownValue;

    if (this.state.editTicked) formData.isImportant = 1;
    else formData.isImportant = 0;
    axios
      .patch(`board/topics/${this.state.currentEditingTopic}`, formData)
      .then((res) => {
        console.log(res);

        let message = "Update Successful";
        const modalData = {
          title: "Success",
          message: message,
          Button: "success",
          img: "success",
          hide: () => {
            this.setState({ showResponse: false });
            window.location.reload(false);
          },
        };

        this.setState({
          loading: false,
          showResponse: true,
          modalData: modalData,
          formIsValid: false,
          currentEditingTopic: null,
          editTopic: null,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          formIsValid: false,
          currentEditingTopic: null,
          editTopic: null,
        });
      });
  };

  createTopicHandler = (event) => {
    event.preventDefault();
    this.setState({ showCreate: false, loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.createTopic) {
      formData[formElementIdentifier] = this.state.createTopic[
        formElementIdentifier
      ].value;
    }
    formData.scope = this.state.createDropDownValue;
    if (this.state.createTicked) formData.isImportant = 1;
    else formData.isImportant = 0;

    axios
      .post(`board/topics/`, formData)
      .then((res) => {
        console.log(res);

        let message = "New Topic Created Successful";
        const modalData = {
          title: "Success",
          message: message,
          Button: "success",
          img: "success",
          hide: () => {
            this.setState({ showResponse: false });
            window.location.reload(false);
          },
        };

        this.setState({
          loading: false,
          showResponse: true,
          modalData: modalData,
          createFormIsValid: false,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          createFormIsValid: false,
        });
      });
  };

  archiveTopicHandler = (event) => {
    event.preventDefault();
    this.setState({ showArchive: false, loading: true });
    const formData = { isImportant: this.state.archiveImportantTicked ? 1 : 0 };

    axios
      .patch(`board/topics/${this.state.currentEditingTopic}/archive`, formData)
      .then((res) => {
        console.log(res);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          currentEditingTopic: null,
          archiveImportantTicked: false,
          // createFormIsValid: false,
        });
      });
  };

  toChatHandler = (topicId) => {
    let taskId = 1;
    axios
      .get(`/board/topics/${topicId}/tasks/`)
      .then((response) => {
        taskId = response.data.tasks[0].id;
      })
      .catch((err) => console.log(err));

    this.props.history.push(`/task/${topicId}/${taskId}`);
  };

  hideModal = () => {
    this.setState({ showModal: false, showCreate: false, showArchive: false });
  };

  render() {
    let addTopic = null;
    let createModal = null;
    let editModal = null;
    let adminTopics = null;
    let userTopics = null;
    let topicEdit = false;
    let topicEditLink = null;
    let nonAdminTopics = 0;
    let archiveModal = null;
    let archiveEdit = null;

    const editTopicForm = [];
    for (let key in this.state.editTopic) {
      editTopicForm.push({
        id: key,
        config: this.state.editTopic[key],
      });
    }

    const createTopicForm = [];
    for (let key in this.state.createTopic) {
      createTopicForm.push({
        id: key,
        config: this.state.createTopic[key],
      });
    }

    const cookies = this.props.cookies.cookies;

    const auth = cookies.isAuthenticated;
    const userData = cookies.userData;

    if (auth && userData && userData !== "undefined") {
      const authJSON = JSON.parse(auth);
      const userDataJSON = JSON.parse(userData);

      if (authJSON && userDataJSON) {
        const userRole = userDataJSON.user.role;

        if (userRole === "admin" || userRole === "superAdmin") {
          // renderFlag = true;
          topicEdit = true;
          topicEditLink = (id) => {
            this.getTopicDetails(id);
          };
          archiveEdit = (id) => {
            this.archiveTicks(id);
          };
          addTopic = (
            <Button
              style={{ border: "0.05px solid #ccc", size: "1.5em" }}
              onClick={() => this.setState({ showCreate: true })}
            >
              <AiFillPlusCircle style={{ marginRight: "5%" }} />
              Add New Topic
            </Button>
          );

          const DropDownOptions = [
            { title: "All Members", value: "member" },
            { title: "Admins only", value: "admin" },
            { title: "Super Admins Only", value: "superAdmin" },
          ];

          editModal = (
            <Modal show={this.state.showModal} onHide={this.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Topic</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col lg={1} md={1} sm={1}></Col>
                  <Col lg={10} md={10} sm={10}>
                    {editTopicForm.map((formElement) => (
                      <InputElements
                        key={formElement.id}
                        element={formElement}
                        changeHandler={this.editInputChangedHandler}
                      />
                    ))}
                    <DropdownButton
                      style={{ marginLeft: "15%" }}
                      title={this.state.editDropDownTitle}
                      id="scope-topic"
                      // bsStyle="success"
                    >
                      {DropDownOptions.map((option) => {
                        return (
                          <MenuItem
                            key={option.title}
                            onClick={() => {
                              this.setState({
                                editDropDownTitle: option.title,
                                editDropDownValue: option.value,
                              });
                            }}
                          >
                            {option.title}
                          </MenuItem>
                        );
                      })}
                    </DropdownButton>
                    <input
                      type="checkbox"
                      checked={this.state.editTicked}
                      style={{
                        display: "inline-block",
                        marginLeft: "8%",
                        marginRight: "2%",
                      }}
                      onChange={() => {
                        const change = !this.state.editTicked;
                        this.setState({ editTicked: change });
                      }}
                    />
                    Mark as Important
                  </Col>
                  <Col lg={1} md={1} sm={1}></Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <ActionModalButtons
                  disabled={
                    !this.state.formIsValid || !this.state.editDropDownValue
                  }
                  submit={this.editTopicHandler}
                  cancel={this.hideModal}
                  yes="Update"
                  no="Close"
                />
              </Modal.Footer>
            </Modal>
          );

          createModal = (
            <Modal show={this.state.showCreate} onHide={this.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>New Topic</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col lg={1} md={1} sm={1}></Col>
                  <Col lg={10} md={10} sm={10}>
                    {createTopicForm.map((formElement) => (
                      <InputElements
                        key={formElement.id}
                        element={formElement}
                        changeHandler={this.createInputChangedHandler}
                      />
                    ))}
                    <DropdownButton
                      style={{ marginLeft: "15%" }}
                      title={this.state.createDropDownTitle}
                      id="scope-topic"
                      // bsStyle="success"
                    >
                      {DropDownOptions.map((option) => {
                        return (
                          <MenuItem
                            key={option.title}
                            onClick={() => {
                              this.setState({
                                createDropDownTitle: option.title,
                                createDropDownValue: option.value,
                              });
                            }}
                          >
                            {option.title}
                          </MenuItem>
                        );
                      })}
                    </DropdownButton>
                    <input
                      type="checkbox"
                      style={{
                        display: "inline-block",
                        marginLeft: "8%",
                        marginRight: "2%",
                      }}
                      onChange={() => {
                        const change = !this.state.createTicked;
                        this.setState({ createTicked: change });
                      }}
                    />
                    Mark as important
                  </Col>
                  <Col lg={1} md={1} sm={1}></Col>
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <ActionModalButtons
                  disabled={
                    !this.state.createFormIsValid ||
                    !this.state.createDropDownValue
                  }
                  submit={this.createTopicHandler}
                  cancel={this.hideModal}
                  yes="Create"
                  no="Close"
                />
              </Modal.Footer>
            </Modal>
          );

          archiveModal = (
            <Modal show={this.state.showArchive} onHide={this.hideModal}>
              <Modal.Header closeButton>
                <Modal.Title>Archive Topic</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <input
                    type="checkbox"
                    checked={this.state.archiveImportantTicked}
                    style={{
                      display: "inline-block",
                      marginLeft: "8%",
                      marginRight: "2%",
                    }}
                    onChange={() => {
                      const change = !this.state.archiveImportantTicked;
                      this.setState({ archiveImportantTicked: change });
                    }}
                  />
                  Mark as Important.
                  <div style={{ padding: "5%" }}>
                    {" "}
                    If marked, you will receive the details of the topic in the
                    next Fortnight Archived Mail.
                  </div>
                  <br />
                </Row>
              </Modal.Body>
              <Modal.Footer>
                <ActionModalButtons
                  disabled={false}
                  submit={this.archiveTopicHandler}
                  cancel={this.hideModal}
                  yes="Archive"
                  no="Close"
                />
              </Modal.Footer>
            </Modal>
          );
        }
      }
    }
    if (this.state.topics) {
      adminTopics = this.state.topics.map((topic) => {
        if (topic.scope == "superAdmin" || topic.scope == "admin") {
          let date = new Date(parseInt(topic.timestamp))
            .toString()
            .split("GMT")[0];
          let stats = `Created At ${date}`;
          if (topic.updated_at) {
            date = new Date(parseInt(topic.updated_at))
              .toString()
              .split("GMT")[0];
            stats = `Last Updated At ${date}`;
          }
          return (
            <Col md={4} sm={12} key={topic.id}>
              <Card
                toChat={() => this.toChatHandler(topic.id)}
                statsIcon="fa fa-history"
                id="chartHours"
                title={topic.heading}
                category=""
                stats={stats}
                style={{
                  border: "0.1px solid #ccc",
                  margin: "2px",
                  marginBottom: "20px",
                }}
                content={<div className="description">{topic.description}</div>}
                topicEdit={topicEdit}
                topicEditLink={() => topicEditLink(topic.id)}
                archiveEdit={() => archiveEdit(topic.id)}
              />
            </Col>
          );
        } else {
          nonAdminTopics++;
        }
      });

      userTopics = this.state.topics.map((topic) => {
        if (topic.scope != "superAdmin" && topic.scope != "admin") {
          let date = new Date(parseInt(topic.timestamp))
            .toString()
            .split("GMT")[0];
          let stats = `Created At ${date}`;
          if (topic.updated_at) {
            date = new Date(parseInt(topic.updated_at))
              .toString()
              .split("GMT")[0];
            stats = `Last Updated At ${date}`;
          }
          return (
            <Col md={4} sm={12} key={topic.id}>
              <Card
                toChat={() => this.toChatHandler(topic.id)}
                statsIcon="fa fa-history"
                id="chartHours"
                title={topic.heading}
                stats={stats}
                topicEdit={topicEdit}
                style={{
                  border: "0.1px solid #ccc",
                  margin: "2px",
                  marginBottom: "20px",
                }}
                topicEditLink={() => topicEditLink(topic.id)}
                archiveEdit={() => archiveEdit(topic.id)}
                content={<div className="description">{topic.description}</div>}
              />
            </Col>
          );
        }
      });
    }

    let responseModal = null;

    if (this.state.modalData)
      responseModal = (
        <ResponseModal
          show={this.state.showResponse}
          onHide={this.state.modalData.hide}
          title={this.state.modalData.title}
          body={this.state.modalData.message}
          button={this.state.modalData.Button}
          img={this.state.modalData.img}
        />
      );
    let adminCard = null;
    if (adminTopics) {
      if (adminTopics.length !== nonAdminTopics) {
        adminCard = (
          <Card
            id="AdminCards"
            title="Admin Scope Topics"
            hCenter
            topicCard
            content={<Row>{adminTopics}</Row>}
            style={{
              border: "0.1px solid #ccc",
              margin: "2px",
              marginBottom: "20px",
            }}
          />
        );
      }
    }

    return (
      <div className="content">
        <Grid fluid>
          {addTopic}
          {createModal}
          {archiveModal}
          {responseModal}
          {editModal}
          {adminCard}
          <Card
            id="UserCards"
            title="User Scope Topics"
            hCenter
            topicCard
            content={<Row>{userTopics}</Row>}
            style={{
              border: "0.1px solid #ccc",
              margin: "2px",
              marginBottom: "20px",
            }}
          />
        </Grid>
      </div>
    );
  }
}

export default Topics;
