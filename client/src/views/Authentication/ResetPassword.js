import React, { Component } from "react";

import axios from "../../axios-root";

import Auxillary from "../../hoc/Auxillary/Auxillary";

import {ResetPassword} from "../../variables/forms"
import checkValidity from "../../variables/validityRules";

import Form from "../../components/Form/Form";
import Spinner from "../../components/Spinner/Spinner";
import ResponseModal from "../../components/Modals/ResponseModal/ResponseModal";

class ResetForm extends Component {
  state = {
    loginForm: ResetPassword,
    formIsValid: false,
    redirectPath:null,
    loading:false,
    modalData:null,
    showModal:false
  }
  
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
    if (inputIdentifier === 'passwordConfirm') {
      updatedFormElement.valid =  updatedFormElement.valid && (updatedFormElement.value===updatedForm['password'].value);
    }
    
    
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
      .patch("/auth/resetPassword", formData)
        
      .then((response) => {
        console.log(response);
        if (response.data) {
          const modalData = {
            title: "Password Reset Succesful",
            message: `You will be redirected to HomePage`,
            Button: "success",
            hide: this.forwardToHome,
            img:"success"
          };
          this.setState({
            loading: false,
            showModal: true,
            modalData: modalData,
          });
          const cookies = this.props.cookies;
          cookies.set("isAuthenticated", true, { path: "/" });
          cookies.set("userData", response.data.data, { path: "/" })
        } else {
          // console.log(response.response);
          // const modalData = {
          //   title: "Error",
          //   message: `${response.response.data.message}`,
          //   Button: "danger",
          //   hide: this.hideModal,
          // };
          this.setState({
            loading: false,
            formIsValid: false,
            // showModal: true,
            // modalData: modalData,
          });
          console.log("Error occured");
        }
      })
      .catch((error) => {
        this.setState({loading: false,formIsValid: false})

      });
  };
  
  hideModal = () => {
    this.setState({ showModal: false });
  };

  forwardToHome = () => {
    this.setState({ showModal: false });
    this.props.history.push("/");
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
        img="Auth"
        title="Reset Password"
        submitAction={this.loginHandler}
        elements={formElementsArray}
        changeHandler={this.inputChangedHandler}
        Description="Reset Your Password Here"
        link=""
        linkData={null}
        btnState={this.state.formIsValid}
      />
    );

    let modal = null;

    if (this.state.modalData)
      modal = (
        <ResponseModal
          show={this.state.showModal}
          img={this.state.modalData.img}
          onHide={this.state.modalData.hide}
          title={this.state.modalData.title}
          body={this.state.modalData.message}
          button={this.state.modalData.Button}
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

export default ResetForm;
