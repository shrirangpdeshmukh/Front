import React, { Component } from "react";

import { Row, Col } from "react-bootstrap";
import { FormInputs } from "../../components/FormInputs/FormInputs";
import Button from "../../components/CustomButton/CustomButton";
import SignUPCard from "./SignUPCard.js";

import Auxillary from "../../hoc/Auxillary/Auxillary";

import checkValidity from "../../variables/validityRules";

class BulkSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        label: "Number of Users",
        type: "number",
        bsClass: "form-control",
        placeholder: "Enter the number of users to be added",
        defaultValue: "",
        validationState: null,
        onChange: (event) => this.changeHandler(event),
      },
      show: true,
      indices: [],
      number: 0,
    };
  }

  changeHandler = (event) => {
    const newForm = { ...this.state.input };
    const newValue = event.target.value;

    newForm.validationState = checkValidity(newValue, { isNumeric: true })
      ? "success"
      : "error";
    this.setState({ number: parseInt(newValue) });
    this.setState({ input: newForm });
  };

  renderForms = (event) => {
    event.preventDefault();
    const num = parseInt(this.state.number);
    const newArray = Array(num).fill(1);
    const newForm = { ...this.state.input };
    newForm.validationState = null;

    this.setState({ indices: newArray, show: false, input: newForm });
  };

  addOne = () => {
    const newForms = [...this.state.indices];
    newForms.push(1);
    this.setState({ indices: newForms });
  };

  render() {
    let forms = null;

    if (this.state.indices.length > 0) {
      forms = this.state.indices.map((index, idx) => {
        if (index === 1) {
          return <SignUPCard key={idx} />;
        } else return null;
      });
    }

    let initialInputs = null;

    if (this.state.show) {
      initialInputs = (
        <form>
          <Row style={{ margin: "10px" }}>
            <Col md={6}>
              <FormInputs
                ncols={["col-md-12"]}
                properties={[this.state.input]}
              />
            </Col>
            <Col md={6}>
              <br />

              <Button
                style={{ marginTop: "5px" }}
                bsStyle="primary"
                onClick={this.renderForms}
                type="submit"
                fill
                disabled={
                  !(
                    this.state.number > 0 ||
                    this.state.input.validationState === "success"
                  )
                }
              >
                Submit
              </Button>
            </Col>
          </Row>
        </form>
      );
    }

    let newButton = null;

    if (!this.state.show) {
      newButton = (
        <Auxillary>
          <div className="clearifx" />
          <Row style={{ margin: "10px", padding: "15px" }}>
            <Button
              style={{ marginTop: "5px", marignBottom: "20px" }}
              bsStyle="primary"
              onClick={this.addOne}
              fill
            >
              Add One more
            </Button>
          </Row>
        </Auxillary>
      );
    }

    return (
      <Auxillary>
        <br />
        <br />
        {initialInputs}
        {forms}
        <br />
        <br />
        {newButton}
      </Auxillary>
    );
  }
}

export default BulkSignUp;
