import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import TaskNavbar from "../components/Navbars/TaskNavbar";
import Footer from "../components/Footer/Footer";
import ChatSidebar from "../components/Sidebar/ChatSidebar";
import axios from "../axios-root";
import { withCookies } from "react-cookie";
import Test from "../views/Task";
import Card from "../components/Cards/Card/Card";
import { Grid, Col, Button } from "react-bootstrap";
import ResponseModal from "../components/Modals/ResponseModal/ResponseModal";
import Auxillary from "../hoc/Auxillary/Auxillary";
import InputElements from "../components/Form/InputElements/InputElements";
import { CreateTask } from "../variables/forms";
import checkValidity from "../variables/validityRules";
import styles from "../components/Form/Form.module.css";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedClasses: "dropdown show-dropdown open",
      modal: false,
      error: false,
      tasks: [],
      routes: [],
      responseModal: false,
      topic: null,
      createTask: CreateTask,
      formIsValid: false,
    };
  }

  componentDidMount() {
    // const params = new URLSearchParams(document.location.search);
    const topicId = this.props.match.params.topicId;
    axios
      .get(`/board/topics/${topicId}/tasks/`)
      .then((response) => {
        console.log(response);
        const routes = [];
        response.data.tasks.forEach((task) => {
          return routes.push({
            path: `/${task.id}`,
            name: task.heading,
            component: Test,
            layout: `/task/${topicId}`,
            icon: "pe-7s-news-paper",
            id: task.id,
            deadline: task.deadline,
            description: task.description,
          });
        });

        console.log(routes);
        this.setState({
          tasks: response.data.tasks,
          routes: routes,
          topic: topicId,
        });
        //console.log(this.props.cookies);
      })
      .catch((err) => this.setState({ error: true }));
  }

  createTaskInputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.createTask,
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

    this.setState({ createTask: updatedForm, formIsValid: formIsValid });
  };

  showModal = () => {
    this.setState({ modal: true });
  };

  hideModal = () => {
    this.setState({ modal: false });
  };

  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === `/task/${this.state.topic}`) {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => (
              <prop.component
                {...props}
                topicId={this.state.topic}
                taskId={prop.id}
                modalData={this.state.modal}
                hideModal={this.hideModal}
                taskDeadline={prop.deadline}
                taskDescription={prop.description}
                name={prop.name}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = (path) => {
    for (let i = 0; i < this.state.routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          this.state.routes[i].layout + this.state.routes[i].path
        ) !== -1
      ) {
        return this.state.routes[i].name;
      }
    }
    return "Brand";
  };

  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  onCreateTask = (e) => {
    e.preventDefault();
    console.log(this.props);
    const formData = {};
    for (let formElementIdentifier in this.state.createTask) {
      formData[formElementIdentifier] = this.state.createTask[
        formElementIdentifier
      ].value;
    }
    axios
      .post(`/board/topics/${this.state.topic}/tasks`, formData)
      .then((response) => {
        console.log(response);
        const modalData = {
          title: "Task Created",
          message: `The task was created successfully. Click OK to go back to the topic !`,
          Button: "success",
          img: "success",
          hide: () => {
            this.setState({ responseModal: false });
            this.props.history.push(
              `/task/${this.state.topic}/${this.state.tasks[0].id}`
            );
            window.location.reload(true);
          },
        };
        this.setState({
          responseModal: true,
          modalData: modalData,
        });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  };

  render() {
    let modal = null;
    if (this.state.modalData)
      modal = (
        <ResponseModal
          show={this.state.responseModal}
          onHide={this.state.modalData.hide}
          title={this.state.modalData.title}
          body={this.state.modalData.message}
          button={this.state.modalData.Button}
          img={this.state.modalData.img}
        />
      );

    let createTaskForm = [];
    for (let key in this.state.createTask) {
      createTaskForm.push({
        id: key,
        config: this.state.createTask[key],
      });
    }

    let form = (
      <div
        className="content"
        style={{ position: " relative", minHeight: "100vh" }}
      >
        <Grid>
          <Col md={10} sm={12}>
            <Card
              title="Create Task"
              content={
                <form>
                  {createTaskForm.map((formElement) => (
                    <InputElements
                      key={formElement.id}
                      element={formElement}
                      changeHandler={this.createTaskInputChangedHandler}
                    />
                  ))}
                  <Button
                    disabled={!this.state.formIsValid}
                    className={styles.Button}
                    onClick={(e) => this.onCreateTask(e)}
                  >
                    Create
                  </Button>
                </form>
              }
            />
          </Col>
        </Grid>
      </div>
    );

    return (
      <div className="">
        <ChatSidebar
          {...this.props}
          routes={this.state.routes}
          layout={`/task/${this.state.topic}`}
        />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <TaskNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
            infoCallback={this.showModal}
          />

          <Switch>
            {this.getRoutes(this.state.routes)}
            <Route
              path={`/task/${this.state.topic}/newTask`}
              render={(props) => (
                <Auxillary>
                  {modal}
                  {form}
                </Auxillary>
              )}
              //key={key}
            />
          </Switch>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withRouter(withCookies(Chat));
