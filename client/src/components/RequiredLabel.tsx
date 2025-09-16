import * as React from "react";
import { Form } from "react-bootstrap";

const RequiredLabel = ({ children }: { children: React.ReactNode }) => {
  return (
    <Form.Label>
      {children} <span className="text-danger">*</span>
    </Form.Label>
  );
};

export default RequiredLabel;
