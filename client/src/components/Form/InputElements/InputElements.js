import React from "react";

//bootstrap
import { FormGroup, InputGroup, FormControl } from "react-bootstrap";

//css
import styles from "./InputElements.module.css";

//icons
import { BsLock, BsLockFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FaUser, FaKey, FaUserEdit } from "react-icons/fa";
import { RiCopperCoinFill, RiQuillPenLine } from "react-icons/ri";

const inputElement = (props) => {
  //styles from icons
  const iconStyle = {
    padding: "0",
    margin: "0px",
    height: "1.2em",
    width: "1.2em",
    borderBottom: "1px solid #ccc",
  };

  //styles for input elements border lines
  const invalidStyle = {
    border: "none",
    borderBottom: "2px solid salmon",
    marginBottom: "10px",
  };

  const validStyle = {
    border: "none",
    borderBottom: "2px solid lightgreen",
    marginBottom: "10px",
  };

  const normalStyle = {
    border: "none",
    borderBottom: "1.5px solid black",
    marginBottom: "10px",
  };

  // selecting icons a/c to input
  const iconSwitch = (input) => {
    let icon = null;
    switch (input) {
      case "email":
        icon = <AiOutlineMail style={iconStyle} />;
        break;

      case "lock":
        icon = <BsLock />;
        break;

      case "user":
        icon = <FaUser />;
        break;

      case "lockFill":
        icon = <BsLockFill />;
        break;

      case "key":
        icon = <FaKey />;
        break;

      case "points":
        icon = <RiCopperCoinFill />;
        break;
      case "reason":
        icon = <RiQuillPenLine />;
        break;
      case "designation":
        icon = <FaUserEdit />;
        break;
      default:
        icon = null;
    }

    return icon;
  };

  // selecting input Elements
  const elementSwitch = (formElement) => {
    let element;

    switch (formElement.config.elementType) {
      case "input":
        // making invalid and valid comparision previously only
        const invalid =
          formElement.config.touched &&
          !formElement.config.valid &&
          formElement.config.validation;

        const valid =
          formElement.config.touched &&
          formElement.config.valid &&
          formElement.config.validation;

        element = (
          <FormGroup key={formElement.id}>
            <InputGroup>
              <InputGroup.Addon
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                {iconSwitch(formElement.config.icon)}
              </InputGroup.Addon>

              <FormControl
                // style={invalid ? invalidStyle : valid ? validStyle : normalStyle}
                style={
                  formElement.config.touched
                    ? valid
                      ? validStyle
                      : invalidStyle
                    : normalStyle
                }
                className={styles.Input} //css
                bsClass={styles.Input}
                type={formElement.config.elementConfig.type} // type of input {text, password, email}
                placeholder={formElement.config.elementConfig.placeholder}
                value={formElement.config.elementConfig.value}
                defaultValue={formElement.config.default}
                onChange={(event) => props.changeHandler(event, formElement.id)}
              />
            </InputGroup>
          </FormGroup>
        );
        break;

      case "textarea":
        element = (
          <FormControl
            className={styles.Textarea}
            as="textarea"
            rows="6"
            defaultValue={formElement.config.default} //default value
            placeholder={formElement.config.elementConfig.placeholder}
            value={formElement.config.elementConfig.value}
            onChange={(event) => props.changeHandler(event, formElement.id)}
          />
        );
        break;

      default:
        element = null;
    }

    return element;
  };

  return elementSwitch(props.element);
};

export default inputElement;
