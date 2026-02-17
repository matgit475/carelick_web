import * as React from "react";
import { Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useForgotPasswordForm from "../../hooks/forms/useForgotPasswordForm";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import Animate from "../../components/Animate";

const ForgotPassword = () => {
  const {
    values,
    isSubmitting,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
  } = useForgotPasswordForm();

  return (
    <Row className="justify-content-center w-100">
      <Col xs={12} md={8} lg={6} xl={6} xxl={4}>
        <Animate duration={0.5} y={25}>
          <Card>
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">Forgot Password</h3>
              <p className="text-center">
                A new password will be sent to your registered email
              </p>
              <SuccessAlert message={successMessage} />
              <DangerAlert message={errorMessage} />
              <Form
                onSubmit={handleSubmit}
                autoComplete="on"
                method="post"
                noValidate
              >
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>User email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values?.email}
                    onChange={handleChange}
                    autoFocus
                  />
                </Form.Group>
                <div className="d-flex gap-3 pt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-50"
                  >
                    {isSubmitting ? "Sending..." : "Send"}
                  </Button>
                  <Link to="/auth/login" className="w-50">
                    <Button variant="light" className="w-100">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Animate>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
