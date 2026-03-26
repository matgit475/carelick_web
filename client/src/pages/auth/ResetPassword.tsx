import * as React from "react";
import { Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import useResetPasswordForm from "../../hooks/forms/useResetPasswordForm";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import Animate from "../../components/Animate";
import validationError from "../../helpers/ValidationError";

const ResetPassword = () => {
  const {
    values,
    isSubmitting,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
    handleBlur,
    fieldErrors,
  } = useResetPasswordForm();
  const { token } = useParams();

  return (
    <Row className="justify-content-center w-100">
      <Col xs={12} md={6} lg={6} xl={4} xxl={4}>
        <Animate duration={0.5} y={25}>
          <Card>
            <Card.Body className="p-4">
              <h3 className="text-center mb-4">Reset Password</h3>

              <SuccessAlert message={successMessage} />
              <DangerAlert message={errorMessage} />

              <Form onSubmit={handleSubmit} noValidate>
                {/* ✅ Hidden token */}
                <input type="hidden" name="token" value={token} />

                {/* ✅ New Password */}
                <Form.Group className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={values?.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={validationError(fieldErrors, "newPassword")}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationError(fieldErrors, "newPassword")}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* ✅ Retype Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Retype Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="retypePassword"
                    placeholder="Retype password"
                    value={values?.retypePassword}
                    onBlur={handleBlur}
                    isInvalid={validationError(fieldErrors, "retypePassword")}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationError(fieldErrors, "retypePassword")}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex gap-3 pt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-50"
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;
