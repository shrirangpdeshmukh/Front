import React from "react";

import { Button, ButtonGroup } from "react-bootstrap";

const ActionModalButton = (props) => {
  return (
    <ButtonGroup>
      <Button
        disabled={props.disabled}
        bsStyle="success"
        className="btn-fill"
        style={{ padding: "5px", margin: "5px" }}
        onClick={props.submit}
      >
        {props.yes}
      </Button>
      <Button
        bsStyle="danger"
        className="btn-fill"
        style={{ padding: "5px", margin: "5px" }}
        onClick={props.cancel}
      >
        {props.no}
      </Button>
    </ButtonGroup>
  );
};

export default ActionModalButton;
