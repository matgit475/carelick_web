import * as React from "react";
import { Alert } from "react-bootstrap";

const SuccessAlert = ({ response }: any) => {
  return response?.message ? (
    <Alert variant="success"> {response?.message} </Alert>
  ) : null;
};

export default SuccessAlert;
