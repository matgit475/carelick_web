import * as React from "react";
import { Alert } from "react-bootstrap";

const SuccessAlert = ({ message }: any) => {
  React.useEffect(() => {
    if (message !== null) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [message]);
  return message ? (
    <Alert variant="success" dismissible>
      {" "}
      {message}{" "}
    </Alert>
  ) : null;
};

export default SuccessAlert;
