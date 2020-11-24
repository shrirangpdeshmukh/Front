import React, { Component } from "react";

import axios from "../../axios-root";

import Auxillary from "../../hoc/Auxillary/Auxillary";

import { Login } from "../../variables/forms";
import checkValidity from "../../variables/validityRules";

import Form from "../../components/Form/Form";
import Spinner from "../../components/Spinner/Spinner";
import ResponseModal from "../../components/Modals/ResponseModal/ResponseModal";

class LoginForm extends Component {
  state = {
    loginForm: Login,
    formIsValid: false,
    loading: false,
    showModal: false,
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.loginForm,
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

    this.setState({ loginForm: updatedForm, formIsValid: formIsValid });
  };

  loginHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdentifier in this.state.loginForm) {
      formData[formElementIdentifier] = this.state.loginForm[
        formElementIdentifier
      ].value;
    }

    axios
      .post("/auth/login", formData, { withCredentials: true })

      .then((response) => {
        if (response.data) {
          this.setState({ loading: false });
          console.log("Login successful");
          const modalData = {
            title: "Log In Succesful",
            message: `Welcome ${response.data.data.user.name} !`,
            Button: "success",
            img: "success",
            hide: this.fowardToHome,
          };

          this.setState({
            loading: false,
            showModal: true,
            modalData: modalData,
          });

          // console.log(this.props.cookies);
          const cookies = this.props.cookies;
          cookies.set("isAuthenticated", true, { path: "/" });
          cookies.set("userData", response.data.data, { path: "/" });
        } else {
          this.setState({ loading: false, formIsValid: false });
          // console.log("Error occured");
        }
      })
      .catch((error) => {
        this.setState({ loading: false, formIsValid: false });
      });
  };

  fowardToHome = () => {
    this.setState({ showModal: false });
    this.props.history.push("/admin/profile");
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    const formElementsArray = [];
    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key],
      });
    }

    let form = (
      <Form
        img="Login"
        title="Login"
        submitAction={this.loginHandler}
        elements={formElementsArray}
        changeHandler={this.inputChangedHandler}
        Description="Log into Your Account"
        link2="Forgot Password ?"
        linkData2="/auth/forgot"
        btnState={this.state.formIsValid}
      />
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    let modal = null;
    if (this.state.modalData)
      modal = (
        <ResponseModal
          show={this.state.showModal}
          onHide={this.state.modalData.hide}
          title={this.state.modalData.title}
          body={this.state.modalData.message}
          button={this.state.modalData.Button}
          img={this.state.modalData.img}
        />
      );

    return (
      <Auxillary>
        {modal}
        {form}
      </Auxillary>
    );
  }
}

export default LoginForm;
