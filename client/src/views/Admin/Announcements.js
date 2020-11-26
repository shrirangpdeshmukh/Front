import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Alert,
  FormControl,
  FormGroup,
  Label,
  Collapse,
} from "react-bootstrap";

import ConfirmModal from "../../components/Modals/confirmModal/ConfirmModal";
import CreateAnnouncementModal from "../../components/Modals/createAnnouncementModal/createAnnouncementModal";

import Spinner from "../../components/Spinner/Spinner";
import Button from "../../components/CustomButton/CustomButton";
import axios from "../../axios-root";

class Announcements extends Component {
  state = {
    open: false,
    showId: null,
    announcements: null,
    error: null,
    announcementData: "click on the statement",
    loading: false,
    showModal: false,
    modalData: null,
    creatingAnnouncement: false,
  };

  componentDidMount() {
    axios
      .get("/board/announcements")
      .then((response) => {
        this.setState({ announcements: response.data.data.announcements });
        console.log(response);
        console.log(this.state.announcements);
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  }
  handleClick(e) {
    e.preventDefault();
    const state = this.state.announcementData;
    console.log(state);
  }

  fullAnnouncementClicked = (e, id) => {
    e.preventDefault();
    const announcement = this.state.announcements.find((a) => a.id === id);
    console.log(this.state.announcements);
    console.log(announcement);
    this.setState({ announcementData: announcement.body, showId: id });
    console.log(this.state.announcementData);
  };

  updateAnnouncement = (id, updatedAnnouncement) => {
    this.setState({ loading: true, showModal: false });
    axios
      .patch(`/board/announcements/${id}`, updatedAnnouncement)
      .then((response) => {
        console.log(response);
        // console.log(this.state.announcements)
        const announcements = response.data.updatedAnnouncements;
        console.log(announcements);
        this.setState({
          open: false,
          showId: null,
          announcements: announcements,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ error: err });
        console.log(err);
      });
  };
  updateClicked(e, text, id) {
    e.preventDefault();
    console.log(text);
    let updatedAnnouncement = {
      updatedAnnouncement: text,
    };
    const modalData = {
      Heading: "Are you sure to update the following announcement:",
      Body: `Are you sure to update the announcement : ${this.state.announcementData}`,
      onContinue: () => this.updateAnnouncement(id, updatedAnnouncement),
    };
    this.setState({ showModal: true, modalData: modalData });
  }

  deleteAnnouncement = (id) => {
    this.setState({ loading: true, showModal: false });
    axios
      .delete(`/board/announcements/${id}/archive`)
      .then((response) => {
        console.log(response);
        this.setState({
          announcements: response.data.announcements,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ error: err });
        console.log(err);
      });
  };
  deleteClicked = (e, id) => {
    e.preventDefault();
    const modalData = {
      Heading: "Are you sure to delete the following announcement:",
      Body: ` ${this.state.announcementData}`,
      onContinue: () => this.deleteAnnouncement(id),
    };
    this.setState({ showModal: true, modalData: modalData });
  };
  closeConfirmClicked = () => {
    this.setState({ showModal: false });
  };
  closeCreateAnnouncementModal = () => {
    this.setState({ creatingAnnouncement: false });
  };
  createAnnouncement = () => {
    let announcementBody = document.getElementById("textarea").value;
    this.setState({ loading: true, creatingAnnouncement: false });
    let announcementdata = {
      announcement: announcementBody,
    };
    axios
      .post("/board/announcements", announcementdata)
      .then((response) => {
        console.log(response);
        this.setState({
          loading: false,
          showModal: false,
          announcements: response.data.announcements,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handleChange = (event) => {
    event.preventDefault();
    // console.log(event.target.value);
    // this.setState({loading : true})
    this.setState({ announcementData: event.target.value });
  };
  render() {
    console.log(this.state.announcementData);
    let announcements;
    let spinner = null;
    let text = this.state.announcementData;
    let modal = null;
    let createAnnouncementModal = null;

    const cookies = this.props.cookies.cookies;
    const auth = cookies.isAuthenticated;
    const userData = cookies.userData;
    let userRole;
    if (auth && userData !== "undefined") {
      const authJSON = JSON.parse(auth);
      const userDataJSON = JSON.parse(userData);

      if (authJSON && userDataJSON) {
        userRole = userDataJSON.user.role;
        console.log(userRole);
      }
    }

    let createAnnouncementButton = null;
    if (userRole !== "user") {
      createAnnouncementButton = (
        <Button
          style={{ border: "none" }}
          onClick={() => this.setState({ creatingAnnouncement: true })}
        >
          <Label>+</Label>
        </Button>
      );
    }
    if (this.state.creatingAnnouncement) {
      createAnnouncementModal = (
        <CreateAnnouncementModal
          create={this.createAnnouncement}
          show={this.state.creatingAnnouncement}
          onClose={this.closeCreateAnnouncementModal}
        />
      );
    }
    let textForm = (
      <FormControl
        style={{ height: "30rem", resize: "none" }}
        componentClass="textarea"
        placeholder="textarea"
        // defaultValue= "Click on any announcement"
        value={text}
        readOnly={userRole === "user"}
        onChange={this.handleChange}
        // controlId = "bigMsg"
      />
      // <input type = "textarea" style = {{height: "30rem", resize: "none"}} value = {text || ""} onChange = {() => console.log(text)} />
    );
    console.log(text);
    console.log(this.state.announcementData);

    if (this.state.loading) {
      spinner = <Spinner />;
    }
    if (this.state.showModal && this.state.modalData) {
      modal = (
        <ConfirmModal
          show={this.state.showModal}
          Heading={this.state.modalData.Heading}
          Body={this.state.modalData.Body}
          onContinue={this.state.modalData.onContinue}
          closeClicked={this.closeConfirmClicked}
        />
      );
    }
    if (this.state.announcements) {
      if (window.innerWidth >= 993) {
        announcements = this.state.announcements.map((el) => (
          <Alert
            bsStyle="info"
            className="alert-with-icon"
            key={el.id}
            style={{ overflow: "hidden" }}
          >
            <span data-notify="icon" className="pe-7s-bell" />
            <span data-notify="message">
              {el.body}
              <button
                className="btn"
                type="button"
                style={{ border: "none" }}
                onClick={(e) => this.fullAnnouncementClicked(e, el.id)}
              >
                (Show full announcement)
              </button>
            </span>
            <h6 style={{ color: "gray" }}>
              {new Date(el.timestamp).toLocaleTimeString()},
              {new Date(el.timestamp).toDateString()}
            </h6>
          </Alert>
        ));
      } else {
        announcements = this.state.announcements.map((el) => (
          <Alert
            bsStyle="info"
            className="alert-with-icon"
            key={el.id}
            style={{ overflow: "hidden" }}
          >
            <span data-notify="icon" className="pe-7s-bell" />
            <span data-notify="message">
              {el.body}

              <button
                className="btn"
                type="button"
                onClick={() =>
                  this.setState({
                    open: !this.state.open,
                    showId: el.id,
                    announcementData: el.body,
                  })
                }
                style={{ border: "none" }}
              >
                (Show full announcement)
              </button>
              <h6 style={{ color: "gray" }}>
                {new Date(el.timestamp).toLocaleTimeString()},
                {new Date(el.timestamp).toDateString()}
              </h6>
            </span>
            <Collapse in={this.state.open && this.state.showId === el.id}>
              <div>
                <div className="card">
                  <FormGroup
                  // controlId="formControlsTextarea"
                  >
                    <FormControl
                      style={{ height: "30rem", resize: "none" }}
                      componentClass="textarea"
                      placeholder={el.body}
                      defaultValue={el.body}
                      className={`message${el.id}`}
                      id={`message${el.id}`}
                      // controlId = {`message${el.id}`}
                      readOnly={userRole === "user"}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </div>
                {userRole === "user" ? null : (
                  <Button
                    className="btn-fill"
                    style={{ marginRight: "10px" }}
                    bsStyle="primary"
                    onClick={(e) =>
                      this.updateClicked(e, this.state.announcementData, el.id)
                    }
                    show={userData !== "user"}
                  >
                    Update
                  </Button>
                )}
                {userRole === "user" ? null : (
                  <Button
                    bsStyle="danger"
                    className="btn-fill"
                    onClick={(e) => this.deleteClicked(e, el.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </Collapse>
          </Alert>
        ));
      }
    }

    if (window.innerWidth >= 993) {
      return (
        <div className="content">
          <Grid fluid>
            {spinner}
            {modal}
            {createAnnouncementModal}

            <div className="card">
              <div className="header">
                <h4 className="title">Latest Announcements</h4>
              </div>

              <div className="content">
                <Row>
                  <Col md={6}>
                    {createAnnouncementButton}
                    {announcements}
                  </Col>
                  <Col md={6}>
                    <h5>Announcement</h5>
                    <div className="card">
                      {/* <div className="content"> */}
                      <FormGroup
                      // controlId="formControlsTextarea"
                      >
                        {textForm}
                      </FormGroup>
                    </div>
                    {/* document.getElementById("formControlsTextarea").value */}
                    {userRole === "user" ? null : (
                      <Button
                        className="btn-fill"
                        style={{ marginRight: "10px" }}
                        bsStyle="primary"
                        onClick={(e) =>
                          this.updateClicked(
                            e,
                            this.state.announcementData,
                            this.state.showId
                          )
                        }
                      >
                        Update
                      </Button>
                    )}
                    {userRole === "user" ? null : (
                      <Button
                        className="btn-fill"
                        bsStyle="danger"
                        onClick={(e) =>
                          this.deleteClicked(e, this.state.showId)
                        }
                      >
                        Delete
                      </Button>
                    )}
                  </Col>
                </Row>
                <br />
                <br />
              </div>
            </div>
          </Grid>
        </div>
      );
    } else {
      return (
        <div className="content">
          {spinner}
          {modal}
          {createAnnouncementModal}

          <ConfirmModal
            Heading="Are you sure to update the following announcement :"
            Body="Hello World!"
          />
          <Grid fluid>
            <div className="card">
              <div className="header">
                <h4 className="title">Latest Announcements</h4>
              </div>
              <div className="content">
                <Row>
                  <Col md={6}>
                    {createAnnouncementButton}
                    {announcements}
                  </Col>
                </Row>
                <br />
                <br />
              </div>
            </div>
          </Grid>
        </div>
      );
    }
  }
}

export default Announcements;
