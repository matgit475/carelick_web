import * as React from "react";
import { Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import useVerifyOtpForm from "../../hooks/forms/useVerifyOtpForm";
import DangerAlert from "../../components/alerts/DangerAlert";
import Animate from "../../components/Animate";

const VerifyOtp = () => {
  const { values, isSubmitting, errorMessage, handleChange, handleSubmit } =
    useVerifyOtpForm();

  return (
    <Row className="justify-content-center w-100">
      <Col xs={12} md={8} lg={6} xl={6} xxl={4}>
        <Animate duration={0.5}>
          <Card>
            <Card.Body className="p-5">
              <h3 className="text-center mb-4">Login with OTP</h3>
              <p className="text-center">
                Login with the OTP send to your email
              </p>
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
                    disabled
                  />
                </Form.Group>
                <Form.Group controlId="formOtp" className="mb-3">
                  <Form.Label>OTP</Form.Label>
                  <Form.Control
                    type="text"
                    name="otp"
                    placeholder="Enter OTP"
                    value={values?.otp}
                    onChange={handleChange}
                    autoFocus
                  />
                </Form.Group>
                <div className="d-flex gap-3 pt-4">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-100"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Animate>
      </Col>
    </Row>
  );
};

export default VerifyOtp;
