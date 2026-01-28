import * as React from "react";
import { Alert } from "react-bootstrap";

const SuccessAlert = ({ message }: any) => {
  return message ? (
    <Alert variant="success" dismissible>
      {" "}
      {message}{" "}
    </Alert>
  ) : null;
};

export default SuccessAlert;
