import React, { Component } from "react";

import axios from "../../axios-root";

import Auxillary from "../../hoc/Auxillary/Auxillary";

import checkValidity from "../../variables/validityRules";
import {ForgotPassword} from "../../variables/forms";

import ResponseModal from "../../components/Modals/ResponseModal/ResponseModal";
import Form from "../../components/Form/Form";
import Spinner from "../../components/Spinner/Spinner";


class ForgotForm extends Component {
  state = {
    loginForm: ForgotPassword,
    formIsValid: false,
    loading: false,
    redirectPath: null,
    modalData:null
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
      .post("/auth/forgotPassword", formData)

      .then((response) => {
        if (response.data) {
          const modalData = {
            title: "Please Check Your Email",
            message: `We have sent a code to your Email address \n ${formData["email"]}.\n  Paste it in the next screen appearing.`,
            Button: "success",
            img:"mail",
            hide: this.forgotToResetPassword,
          };
          this.setState({
            loading: false,
            showModal: true,
            modalData: modalData,
          });
        } else {
          const modalData = {
            title: "Email Does not Exist",
            message: `Please check email provided. Please give a valid email address`,
            Button: "danger",
            hide: this.hideModal,
          };
          this.setState({
            loading: false,
            showModal: true,
            modalData: modalData,
            formIsValid: false,
          });
          console.log("Error occured");
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({loading: false,formIsValid: false});
      });
  };
  
  hideModal = () => {
    this.setState({ showModal: false });
  };

  forgotToResetPassword = () => {
    this.setState({ showModal: false });
    this.props.history.push("/auth/reset");
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
        img="Forgot"
        title="Forgot Password"
        submitAction={this.loginHandler}
        elements={formElementsArray}
        changeHandler={this.inputChangedHandler}
        Description="Enter your E-mail here to reset your Password"
        link2="Already have a Reset Token ?"
        linkData2="/auth/reset"
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

export default ForgotForm;
