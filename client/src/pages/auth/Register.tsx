import * as React from "react";
import { Form, Button, Row, Col, Alert, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import TermsAndConditionsModal from "../../components/modals/TermsAndConditionsModal";
import useRegisterForm from "../../hooks/forms/useRegisterForm";
import RequiredLabel from "../../components/form/RequiredLabel";
import DangerAlert from "../../components/alerts/DangerAlert";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import validationError from "../../helpers/ValidationError";
import Animate from "../../components/Animate";

const Register = () => {
  const {
    successMessage,
    errorMessage,
    fieldErrors,
    values,
    isSubmitting,
    handleBlur,
    handleChange,
    handleChecked,
    handleSubmit,
    handleAccept,
  } = useRegisterForm();

  return (
    <Row className="justify-content-center w-100">
      <Col xs={12} md={8} lg={8} xl={6} xxl={6}>
        <Animate duration={0.5} y={25}>
          <Card>
            <Card.Body className="p-5">
              <h3 className="text-center mb-4">Register</h3>
              <p className="text-center">Register the right way</p>
              <DangerAlert message={errorMessage} />
              <SuccessAlert message={successMessage} />
              <Form onSubmit={handleSubmit} method="post" noValidate>
                <Row>
                  <Col lg={6}>
                    <Form.Group controlId="formFirstName" className="mb-3 ">
                      <RequiredLabel>First Name</RequiredLabel>
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        value={values?.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={validationError(fieldErrors, "firstName")}
                        autoFocus
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationError(fieldErrors, "firstName")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group controlId="formLastName" className="mb-3">
                      <RequiredLabel>Last Name</RequiredLabel>
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        value={values?.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={validationError(fieldErrors, "lastName")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationError(fieldErrors, "lastName")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formEmail" className="mb-3">
                  <RequiredLabel>User Email</RequiredLabel>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values?.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={validationError(fieldErrors, "email")}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationError(fieldErrors, "email")}
                  </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Col lg={6}>
                    <Form.Group controlId="formPassword" className="mb-3">
                      <RequiredLabel>Password</RequiredLabel>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values?.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={validationError(fieldErrors, "password")}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationError(fieldErrors, "password")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group
                      controlId="formConfirmPassword"
                      className="mb-3"
                    >
                      <RequiredLabel>Re-type Password</RequiredLabel>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={values?.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={validationError(
                          fieldErrors,
                          "confirmPassword",
                        )}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationError(fieldErrors, "confirmPassword")}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check
                    id="accept-terms-checkbox"
                    name="termsAccepted"
                    type="checkbox"
                    className="mb-3 d-inline"
                    checked={values?.termsAccepted}
                    onChange={handleChecked}
                    onBlur={handleBlur}
                  />
                  <label
                    className="ps-2"
                    htmlFor="termsAccepted"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    I accept the{" "}
                    <TermsAndConditionsModal onAccept={handleAccept} />
                  </label>
                  <Form.Control.Feedback type="invalid" className="d-block">
                    {validationError(fieldErrors, "termsAccepted")}
                  </Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex gap-3 pt-3">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-50"
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </Button>
                  <Link to="/auth/login" className="w-50">
                    <Button variant="outline-primary" className="w-100">
                      Login
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

export default Register;
