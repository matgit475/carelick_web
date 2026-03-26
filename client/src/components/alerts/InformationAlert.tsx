import * as React from "react";
import { Alert } from "react-bootstrap";

const InformationAlert = ({ message }: any) => {
  return message ? (
    <Alert
      variant="info"
      className="ms-3 me-3 sticky-top"
      style={{ top: "86px", zIndex: 1 }}
    >
      {message}
    </Alert>
  ) : null;
};

export default InformationAlert;
