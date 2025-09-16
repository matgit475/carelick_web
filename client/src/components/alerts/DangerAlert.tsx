import * as React from "react";
import { Alert } from "react-bootstrap";

const DangerAlert = ({ error }: any) => {
  return error?.status !== 422 && error?.message ? (
    <Alert variant="danger"> {error?.message} </Alert>
  ) : null;
};

export default DangerAlert;
