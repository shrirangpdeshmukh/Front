import React, { Component } from "react";

import { Row, Col, DropdownButton, MenuItem } from "react-bootstrap";
import { Card } from "../../components/Cards/Card/Card";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../components/CustomButton/CustomButton";

import axios from "../../axios-root";

import checkValidity from "../../variables/validityRules";

import Auxillary from "../../hoc/Auxillary/Auxillary";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownValue: "Role",
      role: null,
      error: false,
      success: false,
      formIsValid: false,
      loading: false,
      formValues: {
        email: null,
        name: null,
        designation: null,
      },
      form: {
        name: {
          label: "Name",
          type: "text",
          bsClass: "form-control",
          placeholder: "Name",
          value: "",
          validationState: null,
          onChange: (event) =>
            this.changeHandler(
              event,
              {
                required: true,
              },
              "name"
            ),
        },
        email: {
          label: "Email Address",
          type: "email",
          bsClass: "form-control",
          value: "",
          placeholder: "eg123@iitbbs.ac.in",
          validationState: null,
          onChange: (event) =>
            this.changeHandler(
              event,
              {
                required: true,
                isEmail: true,
              },
              "email"
            ),
        },

        designation: {
          label: "Designation",
          type: "text",
          bsClass: "form-control",
          value: "",
          placeholder: "E.g. Core Member",
          validationState: null,
          onChange: (event) =>
            this.changeHandler(
              event,
              {
                required: true,
              },
              "designation"
            ),
        },
      },
    };
  }
  changeHandler = (event, rules, identifier) => {
    const newForm = { ...this.state.form };
    const newElement = { ...newForm[identifier] };
    const val = event.target.value;

    newElement.value = val;
    newElement.validationState = checkValidity(val, rules)
      ? "success"
      : "error";

    newForm[identifier] = newElement;

    const newFormValues = { ...this.state.formValues };

    let formIsValid = true;
    newFormValues[identifier] = val;

    for (let inputIdentifier in newForm) {
      formIsValid =
        newForm[inputIdentifier].validationState === "success" && formIsValid;
    }

    // if (identifier === "email" )

    this.setState({
      formValues: newFormValues,
      formIsValid: formIsValid,
      form: newForm,
    });
  };

  addHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });

    const data = { ...this.state.formValues };
    data["role"] = this.state.role;
    axios
      .post("/users/addUser", data)
      .then((response) => {
        if (response.data) {
          this.setState({ loading: false, success: true });
        } else if (response.response.data.error) {
          this.setState({ loading: false, success: false, error: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  clearHandler = () => {
    if (!this.state.loading && !this.state.success && this.state.error)
      this.setState({ error: false });

    const newForm = { ...this.state.form };

    for (let inputIdentifier in newForm) {
      newForm[inputIdentifier].value = "";
      newForm[inputIdentifier].validationState = null;
    }
    this.setState({ form: newForm, loading: false, success: false });
  };

  render() {
    const roleOptions = [
      "Super Admin",
      "superAdmin",
      "Admin",
      "admin",
      "Member",
      "user",
    ];

    let buttonText = "Add User";
    if (
      !this.state.loading &&
      !this.state.success &&
      !this.state.error &&
      this.state.form.email.validationState === "success" &&
      !this.state.form.email.value.includes(`@iitbbs.ac.in`)
    ) {
      buttonText = "Use College Email";
    } else if (
      !this.state.loading &&
      !this.state.success &&
      !this.state.error
    ) {
      buttonText = "Add User";
    } else if (this.state.loading && !this.state.success) {
      buttonText = "Loading....";
    } else if (!this.state.loading && this.state.success) {
      buttonText = <span>"User Added Successfully" &#10003;</span>;
    } else if (!this.state.loading && !this.state.success && this.state.error) {
      buttonText = <span>"Email Already Taken" &#10006;</span>;
    }

    return (
      <Auxillary className="content">
        <Col md={6} sm={6}>
          <Card
            title="New User"
            content={
              <form>
                <FormInputs
                  ncols={["col-md-6", "col-md-6"]}
                  properties={[this.state.form.name, this.state.form.email]}
                />
                <Row>
                  <Col md={6}>
                    <FormInputs
                      ncols={["col-md-12"]}
                      properties={[this.state.form.designation]}
                    />
                  </Col>
                  <Col md={6}>
                    <DropdownButton
                      bsStyle="info"
                      title={this.state.dropDownValue}
                      className="btn-fill"
                      id="new-role"
                      style={{
                        marginTop: "25px",
                        marginLeft: "5px",
                        paddingLeft: " 30px",
                        paddingRight: "30px",
                        fontSize: "15px",
                      }}
                    >
                      <MenuItem
                        eventKey={roleOptions[1]}
                        onClick={() =>
                          this.setState({
                            dropDownValue: roleOptions[0],
                            role: roleOptions[1],
                          })
                        }
                      >
                        {roleOptions[0]}
                      </MenuItem>
                      <MenuItem
                        eventKey={roleOptions[3]}
                        onClick={() =>
                          this.setState({
                            dropDownValue: roleOptions[2],
                            role: roleOptions[3],
                          })
                        }
                      >
                        {roleOptions[2]}
                      </MenuItem>
                      <MenuItem
                        eventKey={roleOptions[5]}
                        onClick={() =>
                          this.setState({
                            dropDownValue: roleOptions[4],
                            role: roleOptions[5],
                          })
                        }
                      >
                        {roleOptions[4]}
                      </MenuItem>
                    </DropdownButton>
                  </Col>
                </Row>
                <br />
                <br />
                <div className="clearfix" />
                <Button
                  bsStyle="success"
                  fill
                  onClick={this.addHandler}
                  type="submit"
                  style={{ marginLeft: "5px" }}
                  disabled={
                    !(
                      this.state.formIsValid &&
                      this.state.role &&
                      this.state.form.email.value.includes(`@iitbbs.ac.in`)
                    ) ||
                    this.state.loading ||
                    this.state.success ||
                    this.state.error
                  }
                >
                  {buttonText}
                </Button>
                <Button
                  bsStyle="danger"
                  fill
                  style={{ marginLeft: "5px" }}
                  onClick={this.clearHandler}
                  disabled={!this.state.loading && this.state.success}
                >
                  Clear
                </Button>
                <div className="clearfix" />
              </form>
            }
          />
        </Col>
      </Auxillary>
    );
  }
}

export default UserProfile;
